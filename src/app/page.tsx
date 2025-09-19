import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul>
          <li>
            <Link href="/book">Bibliografi</Link>
          </li>
          <li>
            <Link href="/recording">Diskografi</Link>
          </li>
        </ul>


      </main>
      <footer className={styles.footer}>
        &copy; Eivind Grovens institutt for musikk og reinstemming, 2025
      </footer>
    </div>
  );
}
