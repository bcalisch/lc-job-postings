import styles from './PostingOverview.module.css';

export default function PostingOverview({postings, uniquePostings, medianPostingDuration}) {
  const postingIntensity = uniquePostings > 0 ? `${(postings/uniquePostings).toFixed(0)}` : '0';
  const localUniquePostings = uniquePostings.toLocaleString();

  return(
    <>
        <p className="header small">
          Job Postings Overview
        </p>

        
        <div className={styles.container}>
          <div className={styles.gridItem}>
            <p className={styles.large} data-testid="uniquePostings">{localUniquePostings}</p>
            <p className={styles.label}>Unique Postings</p>
          </div>
          <div className={`${styles.gridItem} ${styles.middleItem}`}>
            <p className={styles.large} data-testid="postingIntensity">{postingIntensity} : 1</p>
            <p className={styles.label}>Posting Intensity</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.large} data-testid="medianPostingDuration">{medianPostingDuration || '0'} days</p>
            <p className={`${styles.label} ${styles.bold}`}>Median Posting Duration</p>
          </div>
      </div>

      <p className={styles.fullWidth}>There were {postings.toLocaleString()} total job postings for your selection, of which <span className={styles.bold}>{localUniquePostings}</span> were unique.  These Numbers give us a Posting Intensity of <span className={styles.bold}>{postingIntensity}-to-1</span>, meaning that for ever {postingIntensity} postings there is 1 unique job posting.</p>
      </>
  );
}
