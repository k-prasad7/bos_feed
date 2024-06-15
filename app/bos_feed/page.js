'use client';
import { useState, useEffect } from 'react';
import styles from './bos_feed.module.css';

export default function RssFeed() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/bos_feed')
      .then((response) => response.json())
      .then((data) => {
        setData(JSON.parse(data.output));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>San Francisco Board of Supervisors Feed</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>File #</th>
            <th className={styles.th}>Type</th>
            <th className={styles.th}>Status</th>
            <th className={styles.th}>Intro Date</th>
            <th className={styles.th}>Final Action</th>
            <th className={styles.th}>Title</th>
            <th className={styles.th}>Detail URL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={styles[`type-${item.Type}`]}>
              <td className={styles.td}>{item['File #']}</td>
              <td className={styles.td}>{item.Type}</td>
              <td className={styles.td}>{item.Status}</td>
              <td className={styles.td}>{new Date(item['Intro Date']).toLocaleString()}</td>
              <td className={styles.td}>{item['Final Action']}</td>
              <td className={styles.td}>{item.Title}</td>
              <td className={styles.td}>
                <a className={styles.link} href={item['Detail URL']} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
