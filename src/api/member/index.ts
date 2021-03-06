import { MemberEntity } from '../../model';
import { members } from './mockData';

const baseURL = 'https://api.github.com/orgs/lemoncode';
let mockMembers = members;

const fetchMembers = (): Promise<MemberEntity[]> => {
  return Promise.resolve(mockMembers);
};

const fetchMembersAsync = (): Promise<MemberEntity[]> => {
  const membersURL = `${baseURL}/members`;
  return fetchMembers();
  //return mockMembers;
};

const mapToMembers = (githubMembers: any[]): MemberEntity[] => {
  return githubMembers.map(mapToMember);
};

const mapToMember = (githubMember): MemberEntity => {
  return {
    id: githubMember.id,
    login: githubMember.login,
    avatar_url: githubMember.avatar_url,
    name:"",
    country:"",
    language:"",
    currency:"",
    timezone:"",
  };
};

const saveMember = (member: MemberEntity): Promise<boolean> => {
  const index = mockMembers.findIndex(m => m.id === member.id);

  index >= 0 ?
    updateMember(member, index) :
    insertMember(member);

  return Promise.resolve(true);
};

const updateMember = (member: MemberEntity, index: number) => {
  mockMembers = [
    ...mockMembers.slice(0, index),
    member,
    ...mockMembers.slice(index + 1),
  ];
};

const insertMember = (member: MemberEntity) => {
  member.id = mockMembers.length;

  mockMembers = [
    ...mockMembers,
    member,
  ];
};

export const memberAPI = {
  fetchMembers,
  fetchMembersAsync,
  saveMember,
};
