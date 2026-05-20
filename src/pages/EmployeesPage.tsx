import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEmployees, deleteEmployee } from '../services/employee';
import type { Employee } from '../types';
import EmployeeModal from '../components/EmployeeModal';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 10;

// Helper to generate scalable pagination range
const getPaginationRange = (current: number, total: number) => {
  const delta = 1;
  const range = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l !== undefined) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

export default function EmployeesPage() {
  const { user, logout } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  const fetchEmployees = useCallback(async (p: number) => {
    setLoading(true);
    setError('');
    try {
      const result = await getEmployees(p, ITEMS_PER_PAGE);
      setEmployees(result.data);
      setTotalPages(result.total_pages);
      setTotal(result.total);
    } catch {
      setError('Gagal memuat data karyawan');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees(page);
  }, [page, fetchEmployees]);

  const handleAdd = () => {
    setEditingEmployee(null);
    setModalOpen(true);
  };

  const handleEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteEmployee(deleteTarget.id);
      setDeleteTarget(null);
      if (employees.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        fetchEmployees(page);
      }
    } catch {
      setError('Gagal menghapus karyawan');
    }
  };

  const handleModalClose = (refetch?: boolean) => {
    setModalOpen(false);
    setEditingEmployee(null);
    if (refetch) {
      fetchEmployees(page);
    }
  };

  const paginationRange = getPaginationRange(page, totalPages);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.nama}</span>
            <Button
              onClick={logout}
              variant="destructive"
              size="sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Toolbar */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Daftar Karyawan{' '}
            <span className="text-sm font-normal text-gray-500">
              (Total: {total})
            </span>
          </h2>
          <Button
            onClick={handleAdd}
            size="sm"
          >
            + Tambah Karyawan
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3 text-sm font-medium text-gray-600">
                  NIK
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">
                  Nama
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-600">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Memuat data...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Belum ada data karyawan
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{emp.nik}</td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {emp.nama}
                    </td>
                    <td className="px-4 py-3 text-sm">{emp.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          emp.status_pengisian === 'lengkap'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {emp.status_pengisian === 'lengkap'
                          ? 'Lengkap'
                          : 'Belum Lengkap'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm space-x-2">
                      <Button
                        onClick={() => handleEdit(emp)}
                        variant="link"
                        size="xs"
                        className="text-blue-600 hover:text-blue-800 p-0"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => setDeleteTarget(emp)}
                        variant="link"
                        size="xs"
                        className="text-red-600 hover:text-red-800 p-0"
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            {paginationRange.map((p, idx) => {
              if (p === '...') {
                return (
                  <span key={`dots-${idx}`} className="px-2.5 py-1 text-sm text-gray-500">
                    ...
                  </span>
                );
              }
              return (
                <Button
                  key={p}
                  onClick={() => setPage(p as number)}
                  variant={page === p ? 'default' : 'outline'}
                  size="sm"
                  className="min-w-8"
                >
                  {p}
                </Button>
              );
            })}
            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        )}
      </main>

      {/* Modal Tambah/Edit */}
      {modalOpen && (
        <EmployeeModal
          employee={editingEmployee}
          onClose={handleModalClose}
        />
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <DeleteConfirmDialog
          nama={deleteTarget.nama}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
