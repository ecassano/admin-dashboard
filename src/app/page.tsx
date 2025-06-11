'use client';

import { TypeAnimation } from 'react-type-animation';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.welcomeText}>
          <TypeAnimation
            sequence={[
              'Bem-vindo ao novo painel de administração de projetos da Prefeitura',
              1000,
            ]}
            wrapper="h1"
            speed={50}
            style={{
              fontSize: '2.5rem',
              display: 'inline-block',
              color: 'var(--primary-400)',
              fontWeight: 500,
              lineHeight: '1.2',
            }}
            repeat={0}
          />
        </div>
        <p className={styles.subtitle}>
          Gerencie seus projetos e acompanhe o progresso de forma simples e eficiente.
        </p>
      </div>
    </div>
  );
}
