"use client";

import Container from '../common/Container';
import { motion, Variants } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const units = [
  {
    name: 'Teater & Sastra',
    description: 'Wadah Berekspresi Melalui Seni Peran Serta Sastra.',
    bgImage: '/images/units/tesas.jpg',
  },
  {
    name: 'Kesenian Daerah Sunda',
    description: 'Mengembangkan serta melestarikan seni tari tradisional serta alat-alat musik tradisional.',
    bgImage: '/images/units/kds.jpg',
  },
  {
    name: 'Paduan Suara & Musik',
    description: 'Megasah Vokal Dalam Harmoni Paduan Suara Serta Berlatih Alat Musik.',
    bgImage: '/images/units/psm.jpg',
  },
  {
    name: 'Tari Kreasi',
    description: 'Melatih Gerakan Tubuh Dengan Nada Nada Musik Modern.',
    bgImage: '/images/units/takre.jpg',
  },
  {
    name: 'Fotografi',
    description: 'Belajar teknik fotografi dan pembuatan film dari dasar hingga produksi.',
    bgImage: '/images/units/fg.jpg',
  },
];

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className = 'object-cover' }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={`relative w-full h-full`}>
      {!imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => {
            console.error(`Failed to load image: ${src}`);
            setImageError(true);
          }}
          className={className}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image not found</span>
        </div>
      )}
    </div>
  );
}

// Animation variants
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] // easeOutExpo
    }
  }),
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function UnitSection() {
  // Remove debug useEffect as it's not needed in production

  return (
    <section id="unit" className="py-20 bg-gray-50">
      <Container>
        <motion.div
          className="md:px-12 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div
            className="w-full max-w-3xl mx-auto text-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Unit Kegiatan Kami</h2>
            <motion.p
              className="mt-4 text-lg leading-8 text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Lingkung Seni Mahasiswa memiliki 5 unit kesenian, sebagai berikut:
            </motion.p>
          </motion.div>

          <div className="w-full mt-16 space-y-8">
            {/* First Row - 3 Units */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {units.slice(0, 3).map((unit, index) => (
                <motion.div
                  key={unit.name}
                  className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-64 group"
                  variants={item}
                  custom={index}
                  whileHover="hover"
                >
                  <div className="absolute inset-0 overflow-hidden transition-transform duration-700 group-hover:scale-110">
                    <ImageWithFallback
                      src={unit.bgImage}
                      alt={unit.name}
                      className="object-none"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] transition-all duration-300 group-hover:bg-black/70 flex flex-col justify-center items-center p-6 text-center">
                      <h3 className="text-xl font-bold text-white mb-3">{unit.name}</h3>
                      <p className="text-gray-200">{unit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second Row - 2 Units */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 max-w-2xl mx-auto">
              {units.slice(3).map((unit, index) => (
                <motion.div
                  key={unit.name}
                  className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-64 group"
                  variants={item}
                  custom={index + 3}
                  whileHover="hover"
                >
                  <div className="absolute inset-0 overflow-hidden transition-transform duration-700 group-hover:scale-110">
                    <ImageWithFallback
                      src={unit.bgImage}
                      alt={unit.name}
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] transition-all duration-300 group-hover:bg-black/70 flex flex-col justify-center items-center p-6 text-center">
                      <h3 className="text-xl font-bold text-white mb-3">{unit.name}</h3>
                      <p className="text-gray-200">{unit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
