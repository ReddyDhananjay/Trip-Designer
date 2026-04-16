export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div
        className="max-w-4xl mx-auto bg-white shadow-lg px-10 py-8 font-serif text-gray-900"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold tracking-widest uppercase mb-1">
            Jayesh Krishna
          </h1>
          <p className="text-sm text-gray-600">Lucknow, Uttar Pradesh</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-700">
            <span>📞 9236882056</span>
            <a href="mailto:jayesh152005@gmail.com" className="hover:underline">
              ✉ jayesh152005@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/jayeshkrishna"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              in linkedin.com/in/jayeshkrishna
            </a>
            <a
              href="https://github.com/jayesh-kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              ⌥ github.com/jayesh-kr
            </a>
          </div>
        </div>

        {/* Education */}
        <Section title="Education">
          <EntryRow
            left={<><strong>SRM University AP</strong></>}
            right="Aug. 2024 – Present"
          />
          <EntryRow
            left={<em>Bachelor of Technology in Computer Science (CSE)</em>}
            right={<em>Amravati, Andhra Pradesh</em>}
          />
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <EntryRow
            left={<strong>FOSS Community</strong>}
            right="August 2025 – Present"
          />
          <EntryRow
            left={<em>Content Lead &amp; Speaker</em>}
            right={<em>SRMAP, Andhra Pradesh</em>}
          />
          <BulletList
            items={[
              'Delivering technical sessions on Open Source methodologies and Linux architecture to 100+ university students.',
              'Curating technical documentation and leading workshops, driving a 40% increase in student contributions to FOSS projects.',
            ]}
          />

          <div className="mt-3" />
          <EntryRow
            left={<strong>AWS Cloud Club</strong>}
            right="December 2025 – Present"
          />
          <EntryRow
            left={<em>Community Member &amp; Tech Organizer</em>}
            right={<em>SRMAP, Andhra Pradesh</em>}
          />
          <BulletList
            items={[
              'Managing technical infrastructure for cloud computing events and orchestrating hands-on workshops.',
              'Facilitating sessions on AWS services (EC2, Lambda, etc) to enhance cloud literacy and deployment skills among peers.',
            ]}
          />

          <div className="mt-3" />
          <EntryRow
            left={<strong>Next Tech Lab</strong>}
            right="October 2024 – Present"
          />
          <EntryRow
            left={<em>Member, Blockchain and Web Development</em>}
            right={<em>SRMAP, Andhra Pradesh</em>}
          />
          <BulletList
            items={[
              'Developing decentralized applications and real-time collaboration tools using Rust, Solidity, and Next.js.',
            ]}
          />
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <EntryRow
            left={
              <>
                <strong>TerminalX</strong>{' '}
                <span className="font-normal italic">| Python, Gemini API, CLI |</span>{' '}
                <a href="https://github.com/jayesh-kr" className="underline" target="_blank" rel="noopener noreferrer">GitHub</a>
              </>
            }
            right="April 2025"
          />
          <BulletList
            items={[
              <>Developed an intelligent CLI tool utilizing <strong>Google Gemini API</strong> to translate natural language into executable shell commands.</>,
              'Implemented secure command execution, persistent user configuration, and history management in Python.',
            ]}
          />

          <div className="mt-3" />
          <EntryRow
            left={
              <>
                <strong>ZK-AI Detection Proof</strong>{' '}
                <span className="font-normal italic">| Circom, SnarkJS, Python, Solana |</span>{' '}
                <a href="https://github.com/jayesh-kr" className="underline" target="_blank" rel="noopener noreferrer">GitHub</a>
              </>
            }
            right="July 2025"
          />
          <BulletList
            items={[
              <>Engineered a privacy-preserving deepfake detection system using <strong>ZK-SNARKs</strong> to validate AI-detected content without exposing raw data.</>,
              'Deployed verification smart contracts on Solana and integrated Python-based proof generation for tamper-proof validation.',
            ]}
          />

          <div className="mt-3" />
          <EntryRow
            left={
              <>
                <strong>Stock Prediction Engine</strong>{' '}
                <span className="font-normal italic">| C++, React Native, Docker |</span>{' '}
                <a href="https://github.com/jayesh-kr" className="underline" target="_blank" rel="noopener noreferrer">GitHub</a>
              </>
            }
            right="August 2025"
          />
          <BulletList
            items={[
              <>Built a high-performance <strong>C++ REST API</strong> server for real-time stock analysis, utilizing multi-threading and cpp-httplib.</>,
              <>Implemented custom <strong>SMA/EMA algorithms</strong> for price forecasting and integrated a <strong>React Native</strong> frontend.</>,
            ]}
          />

          <div className="mt-3" />
          <EntryRow
            left={
              <>
                <strong>BlockOps</strong>{' '}
                <span className="font-normal italic">| Rust, Next.js 15, Gemini 2.0 Flash |</span>{' '}
                <a href="https://github.com/jayesh-kr" className="underline" target="_blank" rel="noopener noreferrer">GitHub</a>
              </>
            }
            right="September 2025"
          />
          <BulletList
            items={[
              <>Architected a no-code blockchain automation platform allowing users to generate agents via natural language using <strong>Gemini 2.0 Flash</strong>.</>,
              <>Developed gas-optimized <strong>Rust (Stylus)</strong> smart contracts for token factories and integrated a visual workflow builder with React Flow.</>,
            ]}
          />
        </Section>

        {/* Achievements */}
        <Section title="Achievements">
          <EntryRow
            left={<strong>Build on Aptos Delhi Hackathon &amp; Aptos Ctrl+Move Hackathon</strong>}
            right="Oct. 2025"
          />
          <p className="text-sm italic ml-1">1st Place Winner</p>
          <BulletList
            items={[
              'Won first prize for developing Aptex Wallet, a comprehensive Web3 payment ecosystem on the Aptos blockchain.',
            ]}
          />

          <div className="mt-3" />
          <EntryRow
            left={<strong>Arbitrum RollUp Hack &apos;25</strong>}
            right="Nov. 2025"
          />
          <p className="text-sm italic ml-1">2nd Place Winner</p>
          <BulletList
            items={[
              'Won second prize for developing BlockOps, an automation tool for Blockchain and Defi.',
            ]}
          />
        </Section>

        {/* Technical Skills */}
        <Section title="Technical Skills">
          <div className="text-sm leading-relaxed border border-gray-300 px-4 py-3 rounded">
            <p>
              <strong>Languages</strong>: C, C++, Python, JavaScript, TypeScript, Java, Rust, Solidity, SQL, HTML/CSS
            </p>
            <p>
              <strong>Technologies</strong>: React, Next.js, React Native, Node.js, Express, FastAPI, MongoDB, PostgreSQL, Tailwind CSS, WebRTC
            </p>
            <p>
              <strong>Blockchain</strong>: Ethereum, Solana, Aptos, Arbitrum Stylus, Web3.js, ethers.js, zk-SNARKs, Circom
            </p>
            <p>
              <strong>Tools</strong>: Git, GitHub, Docker, CMake, AWS, Kubernetes, CI/CD, REST APIs, Supabase
            </p>
            <p>
              <strong>Core Competencies</strong>: Data Structures, Algorithms, System Design, Cloud Computing, Distributed Systems
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="text-base font-bold uppercase border-b border-gray-800 pb-0.5 mb-2 tracking-wide">
        {title}
      </h2>
      {children}
    </div>
  );
}

function EntryRow({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-baseline text-sm">
      <span>{left}</span>
      <span className="text-right whitespace-nowrap ml-4">{right}</span>
    </div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc ml-6 mt-1 text-sm space-y-0.5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
