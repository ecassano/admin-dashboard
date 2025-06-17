"use client";
import { TypeAnimation } from "react-type-animation";
import styles from "./page.module.css";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Home() {
  return (
    <div className="w-full min-h-[calc(100vh-var(--header-height))] flex flex-col gap-8 items-center justify-center p-8 bg-[var(--bg)]">
      <Image
        className="w-auto animate-[fadeIn_0.8s_ease-in-out]"
        src={logo}
        alt="Logo"
      />
      <div className="max-w-[900px] text-center animate-[fadeIn_1s_ease-in-out]">
        <div className="mb-8">
          <TypeAnimation
            sequence={[
              "Bem-vindo ao novo painel de administração de projetos da Prefeitura",
              1000,
            ]}
            wrapper="h1"
            speed={50}
            style={{
              fontSize: "2.5rem",
              display: "inline-block",
              color: "var(--primary-400)",
              fontWeight: 500,
              lineHeight: "1.2",
            }}
            repeat={0}
          />
        </div>
        <p className={styles.subtitle}>
          Gerencie seus projetos e acompanhe o progresso de forma simples e
          eficiente.
        </p>
      </div>
    </div>
  );
}
