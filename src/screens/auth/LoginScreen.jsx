import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { useAuth } from '../../hooks/useAuth';
import styles from './LoginScreen.module.css';

const LoginScreen = () => {

  const navigate = useNavigate();
  const { login } = useAuth();
  const { saveUserInfo, userEmail } = useSelector(state => state.auth);
  const [rememberMe, setRememberMe] = useState(false)

  console.log('rememberMe:', rememberMe);
  console.log('userEmail:', userEmail);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data) => {
    console.log('data===>', data.email);
    const success = login(data.email, data.password, rememberMe);
    console.log('login=>', success);
    if (success) {
      navigate('/dashboard', { replace: true });
    } else {
      console.log('login failed');
    }
  };

  useEffect(() => {
    if (saveUserInfo) {
      console.log('saveUserInfo=><>', saveUserInfo);
      setValue('email', userEmail);
      setRememberMe(true);
    }
  }, [saveUserInfo, userEmail, setValue]);


  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.headerSection}>
          <div className={styles.logoWrapper}>
            <span className={styles.logoLetter}>P</span>
          </div>
          <h1 className={styles.mainTitle}>Welcome back</h1>
          <p className={styles.description}>Sign in to continue</p>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Email address</label>
            <input
              className={`${styles.textInput} ${errors.email ? styles.inputInvalid : ''}`}
              placeholder="Email"
              type="email"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.labelRow}>
              <label className={styles.inputLabel}>Password</label>
            </div>
            <input
              className={`${styles.textInput} ${errors.password ? styles.inputInvalid : ''}`}
              placeholder="Password"
              type="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password.message}</span>
            )}
          </div>

          <label className={styles.checkboxRow}>
            <input type="checkbox" onChange={(e) => setRememberMe(e.target.checked)} checked={rememberMe} />
            <span className={styles.checkboxLabel}>Remember me</span>
          </label>

          <button className={styles.submitBtn} type="submit">
            {'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;