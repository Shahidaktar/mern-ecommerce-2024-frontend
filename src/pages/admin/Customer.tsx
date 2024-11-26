import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Skeleton1 } from "../../components/Loader";
import AdminLayout from "../../components/shared/Layout/AdminLayout";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { responseToast } from "../../utils/features";

const Customer = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, isError, error } = useAllUsersQuery(user?._id!);
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! });
    responseToast(res, null, "");
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <AdminLayout>
      {isLoading ? (
        <Skeleton1 />
      ) : (
        <div className=" w-full  space-y-3 overflow-x-scroll scrollbar-hide">
          <h1 className=" p-3 w-full overflow-hidden rounded-md text-gray-700 text-2xl lg:aspect-none group-hover:opacity-75 flex justify-center ">
            All Users
          </h1>
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm  ">
                  Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm ">
                  Email
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm  ">
                  Gender
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm ">
                  Role
                </th>

                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm ">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.users.map((record) => (
                <tr key={record._id}>
                  <td className="px-4 py-1">{record.name}</td>
                  <td className="px-4 py-1">{record.email}</td>
                  <td className="px-4 py-1">{record.gender}</td>
                  <td className="px-4 py-1">{record.role}</td>

                  <td className="px-4 py-3">
                    <button onClick={() => deleteHandler(record._id)}>
                      <ArchiveBoxIcon
                        className="h-6 w-6  text-red-600  hover:rotate-12 transition-all rounded-full"
                        aria-hidden="true"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
};

export default Customer;
