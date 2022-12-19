import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getStudentProfile } from '../../store/actions';

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentProfile());
  }, [])
  
  return (
    <div>Profile</div>
  )
}

export default Profile