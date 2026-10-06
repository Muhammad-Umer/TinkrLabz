// Each technology has one primary home. This is a representative landscape,
// not a promise that every product is appropriate for every engagement.
export const technologyGroups = [
  { title: 'Cloud platforms', items: ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud'] },
  { title: 'Infrastructure & delivery', items: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
  { title: 'Languages & runtimes', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'Go', 'Node.js', '.NET'] },
  { title: 'Application frameworks', items: ['React', 'Next.js', 'Vue.js', 'React Native', 'Flutter', 'Spring Boot'] },
  { title: 'AI & machine learning', items: ['OpenAI', 'Anthropic', 'Google Gemini', 'Hugging Face', 'PyTorch', 'LangChain'] },
  { title: 'Databases & storage', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Qdrant', 'Amazon Redshift'] },
  { title: 'Streaming & analytics', items: ['Apache Kafka', 'Apache Spark', 'dbt'] },
  { title: 'Observability', items: ['Datadog', 'Grafana', 'Prometheus', 'OpenTelemetry'] },
  { title: 'Security & identity', items: ['OAuth 2.0', 'OpenID Connect', 'HashiCorp Vault'] },
] as const
