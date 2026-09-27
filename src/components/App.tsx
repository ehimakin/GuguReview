import React, { useEffect, useRef, useState } from 'react';
import { GOOGLE_REVIEW_URL, PRACTICE_NAME } from '../config';
import { emptyAnswers, generateReview, type Answers } from '../review';

const people = ['Ehim', 'Fiona', 'Sara', 'Other'];
const qualities = ['Friendly', 'Professional', 'Reassuring', 'Thorough', 'Helpful', 'Efficient', 'Patient', 'Welcoming'];
const visits = ['Check-up', 'Emergency', 'Filling', 'Crown', 'Invisalign', 'Root canal', 'Extraction', 'Cosmetic treatment', 'Other'];
const questions = ['Was your experience positive or negative?', 'Who looked after you?', 'Were things explained clearly?', 'Did you feel comfortable and at ease?', 'Did you feel listened to?', 'What stood out?', 'What did you visit for?', 'Your review'];
const labels = ['Your experience', 'Your team', 'The little details', 'The little details', 'The little details', 'What mattered', 'Your visit', 'Ready to share'];

export default function App() {
  const [step, setStep] = useState(0);
  const [negative, setNegative] = useState(false);
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [review, setReview] = useState('');
  const [status, setStatus] = useState('');
  const heading = useRef<HTMLHeadingElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { heading.current?.focus(); setStatus(''); }, [step, negative]);
  function toggle(key: 'people' | 'qualities', value: string) {
    setAnswers(previous => ({ ...previous, [key]: previous[key].includes(value) ? previous[key].filter(item => item !== value) : [...previous[key], value] }));
  }
  function answer(key: 'clear' | 'comfortable' | 'listened', value: boolean) {
    setAnswers(previous => ({ ...previous, [key]: value }));
    setStep(step + 1);
  }
  function finish() { setReview(generateReview(answers, PRACTICE_NAME)); setStep(7); }
  async function copy() {
    try { await navigator.clipboard.writeText(review); setStatus('Copied! On Google, paste your review, choose your stars, then tap Post.'); }
    catch {
      textarea.current?.focus(); textarea.current?.select();
      try { if (!document.execCommand('copy')) throw new Error('Copy failed'); setStatus('Copied! On Google, paste your review, choose your stars, then tap Post.'); }
      catch { setStatus('Please select and copy your review manually.'); }
    }
  }
  function google() {
    // Start copying during the click, and open without awaiting so mobile browsers allow the tab.
    void copy();
    window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  }
  const valid = step === 1 ? answers.people.length > 0 : step === 5 ? answers.qualities.length > 0 : !!answers.visit;
  const options = step === 1 ? people : step === 5 ? qualities : visits;
  return <div className="app">
    <header><a className="brand" href="./" aria-label="Leeds City Dental Care home"><img className="brand-logo" src="/brand/leeds-city-dentalcare-logo.svg" alt="Leeds City Dentalcare" width="293" height="98" /></a><span className="header-note" data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-1" : undefined}>A few taps. Your own words.</span></header>
    <main>
      <div className="progress-top"><span>{negative ? 'Your experience matters' : labels[step]}</span><span>{negative ? 'Let’s make it right' : `${Math.min(step + 1, 7)} of 7`}</span></div>
      <div className="progress" role="progressbar" aria-label="Review progress" aria-valuemin={0} aria-valuemax={7} aria-valuenow={Math.min(step + 1, 7)}>{Array.from({ length: 7 }, (_, i) => <span key={i} className={i <= step ? 'filled' : ''} />)}</div>
      <section className="question" key={negative ? 'negative' : step}>
        <div className="eyebrow"><span /> {negative ? 'WE’RE HERE TO HELP' : step === 7 ? 'A LITTLE THANK YOU GOES A LONG WAY' : 'YOUR VISIT, IN YOUR WORDS'}</div>
        <h1 ref={heading} tabIndex={-1}>{negative ? "We're sorry to hear that." : questions[step]}</h1>
        <p className="subtitle">{negative ? 'Please contact the practice so we can help.' : step === 0 ? 'Let’s start with how your visit felt.' : step === 1 ? 'Choose everyone who looked after you.' : step === 5 ? 'Pick the words that feel right to you.' : step === 6 ? 'Choose the reason for your visit.' : step === 7 ? 'Made from your answers. Make it your own before sharing.' : 'Just go with what feels true to you.'}</p>
        {negative ? <button className="primary" onClick={() => setNegative(false)} data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-2" : undefined}>Back to the start <span>↗</span></button> : step === 0 ? <div className="experience-options"><button className="experience" onClick={() => setStep(1)} data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-3" : undefined}><span className="face">☺</span><span>Positive<small>I had a good experience</small></span><span className="arrow">↗</span></button><button className="experience" onClick={() => setNegative(true)} data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-4" : undefined}><span className="face neutral">☹</span><span>Negative<small>It could have been better</small></span><span className="arrow">↗</span></button></div> : [2, 3, 4].includes(step) ? <div className="yes-no">{[true, false].map(value => <button className="option" key={String(value)} onClick={() => answer(step === 2 ? 'clear' : step === 3 ? 'comfortable' : 'listened', value)}><span>{value ? 'Yes' : 'No'}</span><span className="choice-icon">{value ? '✓' : '−'}</span></button>)}</div> : step === 7 ? <div className="review-area"><label htmlFor="review" data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-5" : undefined}>Your words, ready to share</label><textarea id="review" ref={textarea} value={review} onChange={event => setReview(event.target.value)} /><p className="edit-note" data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-6" : undefined}>You can edit anything above.</p><p className="share-note" id="google-instructions" data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-7" : undefined}>The button below copies your review and opens Google.<br />There, paste your review, choose your stars, and tap Post.</p><button className="primary" aria-describedby="google-instructions" disabled={!review.trim()} onClick={google} data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-8" : undefined}>Leave Google review <span>↗</span></button><button className="copy-button" disabled={!review.trim()} onClick={() => void copy()} data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-9" : undefined}>Copy review <span>⧉</span></button><p className="status" role="status">{status}</p></div> : <><div className="options">{options.map(option => { const selected = step === 1 ? answers.people.includes(option) : step === 5 ? answers.qualities.includes(option) : answers.visit === option; return <button className={`option ${selected ? 'selected' : ''}`} aria-pressed={selected} key={option} onClick={() => step === 1 ? toggle('people', option) : step === 5 ? toggle('qualities', option) : setAnswers({ ...answers, visit: option })}><span>{option}</span><span className={`select-indicator ${step === 6 ? 'radio' : ''}`}>{selected ? '✓' : '+'}</span></button>; })}</div><button className="primary continue" disabled={!valid} onClick={() => step === 6 ? finish() : setStep(step + 1)}>{step === 6 ? 'Build my review' : 'Continue'}<span data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-10" : undefined}>→</span></button>{step === 5 && <button className="skip" onClick={() => { setAnswers({ ...answers, qualities: [] }); setStep(6); }} data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-11" : undefined}>Nothing to add — skip</button>}</>}
        {!negative && step > 0 && <button className="back" onClick={() => setStep(step - 1)} data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-12" : undefined}>← Back</button>}
      </section>
      {!negative && step === 0 && <div className="intro-note"><span data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-13" : undefined}>✧</span><div>A thoughtful review, without the blank page.<small data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-14" : undefined}>About a minute. No sign-up needed.</small></div></div>}
    </main>
    <footer><span className="footer-star" data-local-edit={process.env.NODE_ENV === "development" ? "ve-86963609bec6-15" : undefined}>✦</span> A little feedback. A big difference.<span className="footer-practice">{PRACTICE_NAME}</span></footer>
  </div>;
}
