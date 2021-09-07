import * as React from 'react';

export const MemberHeader: React.StatelessComponent<{}> = () => {
  return (
    <tr>
      <th>Id</th>
      <th>Full Name</th>
      <th>Country</th>
      <th>Language</th>
      <th>Currency</th>
      <th>TimeZone</th>
    </tr>
  );
};
