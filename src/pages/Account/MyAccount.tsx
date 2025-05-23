import { useEffect, useState } from 'react';
import { useAuth } from '../../context/SupabaseProvider';
import { supabase } from '../../lib/supabaseClient';

export default function MyAccount() {
  const { user, role } = useAuth();
  const [person, setPerson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');

  useEffect(() => {
    const loadPerson = async () => {
      if (!user) return;

      // Step 1: Get person_id from user_profiles
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('person_id')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Failed to load user profile:', profileError);
        setLoading(false);
        return;
      }

      if (!profile?.person_id) {
        console.warn('This user does not yet have a person record linked.');
        setLoading(false);
        return;
      }

      // Step 2: Get person details
      const { data: personData, error: personError } = await supabase
        .from('people')
        .select('*')
        .eq('id', profile.person_id)
        .single();

      if (personError) {
        console.error('Failed to load person data:', personError);
        setLoading(false);
        return;
      }

      setPerson(personData);
      setFirstName(personData.first_name ?? '');
      setLastName(personData.last_name ?? '');
      setBirthday(personData.birthday ?? '');
      setLoading(false);
    };

    loadPerson();
  }, [user]);

  const handleSave = async () => {
    if (!person) return;
    setSaving(true);

    const { error } = await supabase
      .from('people')
      .update({
        first_name: firstName,
        last_name: lastName,
        birthday: birthday || null,
      })
      .eq('id', person.id);

    if (error) {
      alert('Failed to update profile');
      console.error(error);
    } else {
      alert('Profile updated!');
    }

    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (!user) return <p>Not logged in.</p>;
  if (loading) return <p>Loading account...</p>;

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 20 }}>
      <h1>My Account</h1>
      <p><strong>Email:</strong> {user.email}</p>
      {role && <p><strong>Role:</strong> {role}</p>}

      {!person ? (
        <p style={{ color: 'orange' }}>
          Your account is not yet linked to a person record.
        </p>
      ) : (
        <>
          <div style={{ marginTop: 20 }}>
            <label>First Name</label><br />
            <input value={firstName} onChange={e => setFirstName(e.target.value)} /><br /><br />

            <label>Last Name</label><br />
            <input value={lastName} onChange={e => setLastName(e.target.value)} /><br /><br />

            <label>Birthday</label><br />
            <input type="date" value={birthday ?? ''} onChange={e => setBirthday(e.target.value)} /><br /><br />

            <button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </>
      )}

      <hr style={{ margin: '40px 0' }} />

      <button onClick={handleLogout} style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px' }}>
        Log Out
      </button>
    </div>
  );
}
