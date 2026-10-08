import {
  getAdminUsersData,
  getAdminUsersByFilter,
} from "@dashboard/admin/_actions/adminActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  UserCheck,
  UserX,
  Building2,
  Home as HomeIcon,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { generateInitials } from "@/lib/utils";
import UserRowActions from "./UserRowActions";

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  ACTIVE: {
    label: "Active",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
  },
  INACTIVE: {
    label: "Inactive",
    color: "text-slate-500",
    bg: "bg-slate-100 border-slate-200",
    dot: "bg-slate-400",
  },
};

const roleConfig: Record<string, { label: string; color: string; bg: string }> =
  {
    TENANT: {
      label: "Tenant",
      color: "text-blue-700",
      bg: "bg-blue-50 border-blue-200",
    },
    LANDLORD: {
      label: "Landlord",
      color: "text-brand-700",
      bg: "bg-brand-50 border-brand-200",
    },
  };

const UsersList = async ({
  role,
  status,
}: {
  role?: string;
  status?: string;
}) => {
  const [statsData, filteredData] = await Promise.all([
    getAdminUsersData(),
    role || status ? getAdminUsersByFilter(role, status) : getAdminUsersData(),
  ]);

  if (!statsData || !filteredData) return null;

  const { meta } = statsData;
  const { users } = filteredData;

  const stats = [
    {
      label: "Total Users",
      value: meta.total_users,
      icon: Users,
      accent: "from-slate-100 to-slate-50",
      iconColor: "text-slate-700",
    },
    {
      label: "Landlords",
      value: meta.total_landlords,
      icon: Building2,
      accent: "from-brand-50 to-white",
      iconColor: "text-brand-600",
    },
    {
      label: "Tenants",
      value: meta.total_tenants,
      icon: HomeIcon,
      accent: "from-blue-50 to-white",
      iconColor: "text-blue-600",
    },
    {
      label: "Active",
      value: meta.active_users,
      icon: UserCheck,
      accent: "from-emerald-50 to-white",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-b p-4 shadow-sm",
              stat.accent,
            )}
          >
            <div
              className={cn(
                "mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm",
                stat.iconColor,
              )}
            >
              <stat.icon className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-slate-900">
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs font-medium text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-[1.5rem] border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-slate-500 px-6 py-4">
                User
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 px-6 py-4">
                Role
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 px-6 py-4">
                Status
              </TableHead>
              <TableHead className="px-6 py-4">
                <div className="flex justify-end text-xs font-semibold text-slate-500">
                  Actions
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => {
              const userStatus =
                statusConfig[user.status] ?? statusConfig.ACTIVE;
              const userRole = roleConfig[user.role] ?? roleConfig.TENANT;

              return (
                <TableRow
                  key={user.id}
                  className="border-slate-100 hover:bg-slate-50/50"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 rounded-full overflow-hidden border border-slate-200 bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {user.avatar ? (
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            fill
                            className="object-cover"
                            sizes="36px"
                          />
                        ) : (
                          generateInitials(user.name)
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                        userRole.bg,
                        userRole.color,
                      )}
                    >
                      {userRole.label}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                        userStatus.bg,
                        userStatus.color,
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          userStatus.dot,
                        )}
                      />
                      {userStatus.label}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex justify-end">
                      <UserRowActions userId={user.id} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {users.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Users className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              No users found
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersList;
