import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Chart from '@/components/Chart'
import Tokenomics from '@/components/Tokenomics'
import Roadmap from '@/components/Roadmap'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section id="chart" className="section py-16 sm:py-24">
        <Chart />
      </section>
      <section id="tokenomics" className="section py-16 sm:py-24">
        <Tokenomics
          items={[
            { label: 'Total Supply', value: '1,000,000,000 $JOBLESS', icon: 'Coins' },
            { label: 'Liquidity', value: 'Locked', icon: 'Lock' },
            { label: 'Taxes', value: '0 / 0', icon: 'Percent' },
            { label: 'Distribution', value: 'Fair launch', icon: 'PieChart' },
            { label: 'Chain', value: 'Solana', icon: 'BadgeDollarSign' },
          ]}
        />
      </section>
      <section id="roadmap" className="section py-16 sm:py-24">
        <Roadmap />
      </section>
      <section id="faq" className="section py-16 sm:py-24">
        <FAQ />
      </section>
      <Footer />
    </main>
  )
}

