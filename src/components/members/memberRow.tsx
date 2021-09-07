import * as React from 'react';
import { MemberEntity } from '../../model';

interface Props {
  member: MemberEntity;
}

export const MemberRow: React.StatelessComponent<Props> = ({member}) => {
  return (
    <tr>
      <td>
          <span>{member.id}</span>
      </td>
      <td>
        <span>{member.name}</span>
      </td>
      <td>
        <span>{member.country}</span>
      </td>
      <td>
        <span>{member.language}</span>
      </td>
      <td>
        <span>{member.currency}</span>
      </td>
      <td>
        <span>{member.timezone}</span>
      </td>
    </tr>
  );
};
