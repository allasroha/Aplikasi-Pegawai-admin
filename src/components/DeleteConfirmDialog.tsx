interface Props {
  nama: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({
  nama,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 mx-4">
        <h2 className="text-lg font-bold mb-2">Konfirmasi Hapus</h2>
        <p className="text-sm text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus karyawan{' '}
          <span className="font-semibold">{nama}</span>? Tindakan ini tidak
          dapat dibatalkan.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
