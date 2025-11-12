import { useRoles } from '../hooks/useVectorData';

/**
 * Example component demonstrating vector data integration
 *
 * This shows how to use the useRoles hook to display resume data
 * with source citations and provenance information.
 */
export default function VectorDataExample() {
  const roles = useRoles();

  if (roles.length === 0) {
    return <div>Loading roles...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Work Experience (from Vector Data)</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Data loaded from: data/vector/work_experiences.json
      </p>

      {roles.map(role => (
        <div
          key={role.role_id}
          style={{
            marginBottom: '40px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            {role.title}
          </h2>
          <h3 style={{ color: '#555', fontWeight: 'normal' }}>
            {role.company} • {role.location}
          </h3>
          <p style={{ color: '#777', fontSize: '14px' }}>
            {role.timeframe.start} - {role.timeframe.end || 'Present'}
          </p>

          <p style={{ margin: '15px 0', fontStyle: 'italic' }}>
            {role.summary}
          </p>

          <div style={{ marginTop: '15px' }}>
            <strong>Technologies:</strong>{' '}
            {role.core_tech.map((tech, idx) => (
              <span key={tech}>
                <code
                  style={{
                    background: '#f5f5f5',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontSize: '13px',
                  }}
                >
                  {tech}
                </code>
                {idx < role.core_tech.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <strong>Key Achievements:</strong>
            <ul style={{ marginTop: '10px' }}>
              {role.highlights.map((highlight, idx) => (
                <li key={idx} style={{ marginBottom: '10px' }}>
                  {highlight.description}
                  {highlight.source.page && (
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#999',
                        marginLeft: '8px',
                      }}
                      title={`Source: ${highlight.source.path}`}
                    >
                      (p. {highlight.source.page}
                      {highlight.source.section && ` - ${highlight.source.section}`})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
