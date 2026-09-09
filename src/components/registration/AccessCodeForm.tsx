"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface AccessCodeFormProps {
  onCodeVerified: (accessCode: string) => void;
}

export default function AccessCodeForm({ onCodeVerified }: AccessCodeFormProps) {
  const router = useRouter();
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessCode.trim()) {
      toast.error('Masukkan kode akses terlebih dahulu');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/verify-access-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessCode: accessCode.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        toast.success('Kode akses valid!');
        onCodeVerified(data.accessCode || accessCode.trim());
      } else if (response.ok && data.isUsed) {
        // Kode sudah digunakan, redirect ke halaman riwayat
        toast.success('Mengarahkan ke riwayat pendaftaran...');
        router.push(data.redirectTo);
      } else {
        toast.error(data.message || 'Kode akses tidak valid');
      }
    } catch (error) {
      console.error('Error verifying access code:', error);
      toast.error('Terjadi kesalahan saat memverifikasi kode akses');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-lisma-text">
              <span className="block">Pendaftaran</span>
              <span className="block text-2xl font-semibold text-lisma">Anggota Baru 2025</span>
            </h2>
          </div>

          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div>
                <label htmlFor="access-code" className="block text-sm font-medium text-lisma-text mb-2">
                  Masukan Kode Akses
                </label>
                <input
                  id="access-code"
                  name="access-code"
                  type="text"
                  required
                  disabled={isLoading}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-lisma-text rounded-lg focus:outline-none focus:ring-2 focus:ring-lisma focus:border-lisma focus:z-10 text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Kode akses Anda"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="text-sm font-medium text-lisma hover:text-lisma-dark transition-colors"
                >
                  Belum memiliki kode akses? Klik sini
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-lisma hover:bg-lisma-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lisma transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Memverifikasi...
                  </div>
                ) : (
                  'Verifikasi Kode'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg max-w-md w-full p-6 relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Tutup"
            >
              <span className="text-2xl">&times;</span>
            </button>

            <h3 className="text-lg font-bold mb-4">Kode Akses</h3>

            <div className="space-y-4 text-sm text-gray-700">
              <p>Lakukan pembelian kode akses seharga Rp. 30.000 melalui:</p>

              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">BLU BCA 008118833877</p>
                <p className="text-gray-600">(ZAHRA RANITYAN)</p>
                {/* <div className="my-3 border-t border-gray-200"></div> */}
              </div>

              <p>
                Jika sudah melakukan pembayaran, silakan konfirmasi pembayaran ke Contact Person untuk mendapatkan kode akses.
              </p>

              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="font-medium">Contact Person:</p>
                <p>
                  <a
                    href="https://wa.me/62881022443279"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    0881022443279
                  </a>{' '}
                  (Fajar Pamungkas)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
