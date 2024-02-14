import {FunctionComponent} from 'react'
import styled from '@emotion/styled'

// 프로필 이미지
const PROFILE_IMAGE_LINK =
  'https://avatars.githubusercontent.com/u/121420298?v=4'

const ProfileImageWrapper = styled.img`
    width: 120px;
    height: 120px;
    margin-bottom: 30px;
    border-radius: 50%;
`;

const ProfileImage: FunctionComponent = () => {
  return <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />
};

export default ProfileImage;