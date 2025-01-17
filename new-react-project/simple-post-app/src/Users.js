const Users = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Zipcode:</strong> {user.zipcode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;


/* const Users = ({ users }) => {
  return (
    <div>
      <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
        {JSON.stringify(users, null, 2)}
      </pre>
    </div>
  );
};

export default Users;

 */