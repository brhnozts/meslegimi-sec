"use client";

import { useMemo, useState } from "react";

export function CareerBrowser({ careers, title, description }) {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [subGroup, setSubGroup] = useState("");

  const groups = useMemo(() => [...new Set(careers.map((item) => item.group).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr")), [careers]);
  const subGroups = useMemo(
    () => [...new Set(careers.map((item) => item.subGroup).filter(Boolean))].sort((a, b) => a.localeCompare(b, "tr")),
    [careers]
  );

  const filtered = useMemo(() => {
    const lowered = search.toLocaleLowerCase("tr");
    return careers.filter((career) => {
      const haystack = [career.title, career.group, career.subGroup, career.short, career.description, ...(career.skills || []), ...(career.workAreas || [])]
        .join(" ")
        .toLocaleLowerCase("tr");
      return (!lowered || haystack.includes(lowered)) && (!group || career.group === group) && (!subGroup || career.subGroup === subGroup);
    });
  }, [careers, group, search, subGroup]);

  return (
    <section className="section-space">
      <div className="container">
        <div className="glass-panel">
          <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-3">
            <div>
              <h1 className="section-title">{title}</h1>
              <p className="section-text mb-0">{description}</p>
            </div>
            <div className="pill">{filtered.length} kayıt</div>
          </div>
          <div className="soft-block mb-4">
            <div className="filter-bar">
              <div>
                <label className="form-label fw-semibold">Arama</label>
                <input className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Meslek adı, açıklama..." />
              </div>
              <div>
                <label className="form-label fw-semibold">Ana grup</label>
                <select className="form-select" value={group} onChange={(e) => setGroup(e.target.value)}>
                  <option value="">Tümü</option>
                  {groups.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label fw-semibold">Alt grup</label>
                <select className="form-select" value={subGroup} onChange={(e) => setSubGroup(e.target.value)}>
                  <option value="">Tümü</option>
                  {subGroups.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex align-items-end">
                <button
                  className="btn btn-outline-dark w-100"
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setGroup("");
                    setSubGroup("");
                  }}
                >
                  Temizle
                </button>
              </div>
            </div>
          </div>
          <div className="row g-4">
            {filtered.map((career) => (
              <div className="col-md-6 col-xl-4" key={career.id}>
                <div className="detail-card h-100">
                  <h4 className="fw-bold mb-2">{career.title}</h4>
                  <div className="muted-text mb-2">
                    {career.group} • {career.subGroup}
                  </div>
                  <p className="muted-text mb-3">{career.short}</p>
                  <div className="mb-3">
                    {(career.skills || []).slice(0, 4).map((item) => (
                      <span className="tag me-1 mb-1" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <details>
                    <summary className="btn btn-outline-dark btn-sm rounded-pill">Detayları gör</summary>
                    <div className="mt-3">
                      <p className="muted-text">{career.description}</p>
                      {(career.programs || []).length > 0 && (
                        <div className="mb-3">
                          <strong className="d-block mb-2">Programlar</strong>
                          {career.programs.map((item) => (
                            <span className="tag me-1 mb-1" key={item}>
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                      {(career.workAreas || []).length > 0 && (
                        <div>
                          <strong className="d-block mb-2">Çalışma alanları</strong>
                          <ul className="list-clean mb-0">
                            {career.workAreas.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
