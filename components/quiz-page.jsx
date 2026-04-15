"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export function QuizPage({ title, description, questions, resultsHref }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const question = questions[currentIndex];
  const progress = useMemo(() => ((currentIndex + 1) / questions.length) * 100, [currentIndex, questions.length]);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="glass-panel">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
            <div>
              <h1 className="section-title mb-2">{title}</h1>
              <p className="section-text mb-0">{description}</p>
            </div>
            <div className="pill">
              İlerleme: <strong>{currentIndex + 1} / {questions.length}</strong>
            </div>
          </div>

          <div className="progress-wrap mb-4">
            <div className="progress-bar-custom" style={{ width: `${progress}%` }} />
          </div>

          <div className="mb-4">
            <div className="pill mb-3">Adım {currentIndex + 1}</div>
            <h3 className="fw-bold mb-2">{question.title}</h3>
            {question.subtitle ? <p className="muted-text mb-0">{question.subtitle}</p> : null}
          </div>

          <div className="row g-3">
            {question.options.map((option, index) => (
              <div className="col-md-6" key={option.label}>
                <button
                  type="button"
                  className={`choice-card p-3 w-100 text-start ${answers[currentIndex] === index ? "active" : ""}`}
                  onClick={() => {
                    setAnswers((prev) => {
                      const next = [...prev];
                      next[currentIndex] = index;
                      return next;
                    });
                  }}
                >
                  <div className="choice-icon">{option.icon}</div>
                  <div className="fw-bold mb-2">{option.label}</div>
                  <div className="muted-text">Bu seçenek sana daha yakınsa seçebilirsin.</div>
                </button>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
            <button className="btn btn-outline-secondary rounded-pill px-4" disabled={currentIndex === 0} onClick={() => setCurrentIndex((value) => value - 1)}>
              Geri
            </button>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-dark rounded-pill px-4"
                onClick={() => {
                  setAnswers(questions.map(() => null));
                  setCurrentIndex(0);
                }}
              >
                Baştan Başla
              </button>
              {currentIndex === questions.length - 1 ? (
                <Link className="btn btn-dark rounded-pill px-4" href={resultsHref}>
                  Sonuçlara Git
                </Link>
              ) : (
                <button
                  className="btn btn-dark rounded-pill px-4"
                  onClick={() => {
                    if (answers[currentIndex] === null) return;
                    setCurrentIndex((value) => value + 1);
                  }}
                >
                  İleri
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
