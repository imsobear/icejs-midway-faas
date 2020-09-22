import React, { useState, useEffect } from 'react';
import { useRequest } from 'ice';
import { hello, sendMessage } from '@/apis/lambda';
import styles from './index.module.scss';

export default function Home() {
  const { data, loading, request } = useRequest(() => hello());

  useEffect(() => {
    request();
  }, []);

  return (
    <div className={styles.container}>
      Home
      <div>
        { loading ? 'loading....' : data?.message }
      </div>
    </div>
  );
}
