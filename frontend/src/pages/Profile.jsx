import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const initialProfile = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  country: '',
};

const Profile = () => {
  const { token, backendUrl, navigate } = useContext(ShopContext);
  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setProfile({
            name: response.data.user.name || '',
            email: response.data.user.email || '',
            phone: response.data.user.phone || '',
            address: response.data.user.address || '',
            city: response.data.user.city || '',
            country: response.data.user.country || '',
          });
        } else {
          toast.error(response.data.message || 'Unable to load profile');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, backendUrl, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await axios.put(
        `${backendUrl}/api/user/profile`,
        profile,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setProfile({
          name: response.data.user.name || '',
          email: response.data.user.email || '',
          phone: response.data.user.phone || '',
          address: response.data.user.address || '',
          city: response.data.user.city || '',
          country: response.data.user.country || '',
        });
        toast.success(response.data.message || 'Profile updated');
      } else {
        toast.error(response.data.message || 'Could not update profile');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='max-w-4xl mx-auto py-16 text-gray-600'>
        Loading profile...
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto py-10'>
      <div className='mb-8'>
        <p className='text-sm tracking-[0.3em] text-gray-500 uppercase'>Account</p>
        <h1 className='text-3xl sm:text-4xl font-semibold text-gray-900 mt-2'>My Profile</h1>
        <p className='text-gray-600 mt-3 max-w-2xl'>
          Keep your account details up to date so your orders and contact info stay accurate.
        </p>
      </div>

      <div className='grid gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
        <div className='bg-stone-100 rounded-2xl p-6 sm:p-8'>
          <p className='text-sm uppercase tracking-[0.3em] text-gray-500'>Profile Summary</p>
          <div className='mt-6 h-16 w-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-semibold'>
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 className='text-2xl font-semibold text-gray-900 mt-5'>{profile.name || 'Your Name'}</h2>
          <p className='text-gray-600 mt-2'>{profile.email || 'your@email.com'}</p>

          <div className='mt-8 space-y-4 text-sm text-gray-700'>
            <div className='border-b border-stone-300 pb-4'>
              <p className='text-gray-500'>Phone</p>
              <p className='mt-1'>{profile.phone || 'Add your phone number'}</p>
            </div>
            <div className='border-b border-stone-300 pb-4'>
              <p className='text-gray-500'>Address</p>
              <p className='mt-1'>{profile.address || 'Add your street address'}</p>
            </div>
            <div>
              <p className='text-gray-500'>Location</p>
              <p className='mt-1'>
                {[profile.city, profile.country].filter(Boolean).join(', ') || 'Add your city and country'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='border border-gray-200 rounded-2xl p-6 sm:p-8'>
          <div className='grid gap-5 sm:grid-cols-2'>
            <label className='flex flex-col gap-2 sm:col-span-2'>
              <span className='text-sm font-medium text-gray-700'>Full Name</span>
              <input
                type='text'
                name='name'
                value={profile.name}
                onChange={handleChange}
                className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black'
                placeholder='Enter your full name'
                required
              />
            </label>

            <label className='flex flex-col gap-2 sm:col-span-2'>
              <span className='text-sm font-medium text-gray-700'>Email Address</span>
              <input
                type='email'
                name='email'
                value={profile.email}
                onChange={handleChange}
                className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black'
                placeholder='Enter your email'
                required
              />
            </label>

            <label className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-gray-700'>Phone</span>
              <input
                type='text'
                name='phone'
                value={profile.phone}
                onChange={handleChange}
                className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black'
                placeholder='Phone number'
              />
            </label>

            <label className='flex flex-col gap-2'>
              <span className='text-sm font-medium text-gray-700'>Country</span>
              <input
                type='text'
                name='country'
                value={profile.country}
                onChange={handleChange}
                className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black'
                placeholder='Country'
              />
            </label>

            <label className='flex flex-col gap-2 sm:col-span-2'>
              <span className='text-sm font-medium text-gray-700'>Address</span>
              <input
                type='text'
                name='address'
                value={profile.address}
                onChange={handleChange}
                className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black'
                placeholder='Street address'
              />
            </label>

            <label className='flex flex-col gap-2 sm:col-span-2'>
              <span className='text-sm font-medium text-gray-700'>City</span>
              <input
                type='text'
                name='city'
                value={profile.city}
                onChange={handleChange}
                className='border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black'
                placeholder='City'
              />
            </label>
          </div>

          <div className='flex items-center gap-4 mt-8'>
            <button
              type='submit'
              disabled={saving}
              className='bg-black text-white px-8 py-3 rounded-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type='button'
              onClick={() => navigate('/orders')}
              className='border border-gray-300 px-8 py-3 rounded-lg cursor-pointer'
            >
              View Orders
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
