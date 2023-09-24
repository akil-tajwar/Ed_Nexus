'use client'
import { toast } from "react-toastify";
import DeleteUser from "./DeleteUser";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'


const Settings = () => {
  const router = useRouter()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { data: session, status } = useSession();
  const handlePasswordChange = async (data) => {
    const current_password = data.current_password;
    const password = data.new_password;
    const confirm_password = data.confirm_password
    if (password !== confirm_password) {
      return toast.warning('password not match')
    }

    else {
      const res = await axios.put("http://localhost:3000/api/changePassword", { current_password, password });
      const data = res.data;
      console.log(data)
      if (data.message) {
        reset()
        signOut()
        router.push('/')
        toast.success('Your password change')
      }
    }

  }

  if (status === 'authenticated') {
    return (
      <div className="pt-32 lg:w-3/4 w-11/12 mx-auto px-7 py-10">
        <h5 className="font-semibold text-2xl">Profile Setting</h5>
        <div className="grid grid-cols-2 mt-2 mb-10">
          <div className="col-span-2 border">
            <div className="grid grid-cols-3 border-b p-3">
              <h6>Showcase your achievements</h6>
              <p className="text-end">Yes</p>
              <div className="text-end">
                <button className="bg-[#0083db] text-white px-2 rounded">
                  Edit
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 p-3">
              <h6>Change password</h6>
              <p className="text-end">********2e</p>
              <div className="text-end">
                <button
                  onClick={() => window.my_modal_5.showModal()}
                  className="bg-[#0083db] text-white px-2 rounded">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <h5 className="font-semibold text-2xl">Privacy Setting</h5>
        <div className="grid grid-cols-2 mt-2 mb-10">
          <div className="col-span-2 border">
            <div className="grid grid-cols-3 border-b p-3">
              <h6>Who can visit your profile</h6>
              <p className="text-end">Everyone</p>
              <div className="text-end">
                <button className="bg-[#0083db] text-white px-2 rounded">
                  Edit
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 border-b p-3">
              <h6>Who can add you in a class</h6>
              <p className="text-end">Only me</p>
              <div className="text-end">
                <button className="bg-[#0083db] text-white px-2 rounded">
                  Edit
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 p-3">
              <h6>Who can follow your activity</h6>
              <p className="text-end">Everyone</p>
              <div className="text-end">
                <button className="bg-[#0083db] text-white px-2 rounded">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <h5 className="font-semibold text-2xl">Notification Setting</h5>
        <div className="grid grid-cols-2 mt-2 mb-10">
          <div className="col-span-2 border">
            <div className="grid grid-cols-3 border-b p-3">
              <h6>How do you want to get notified</h6>
              <p className="text-end">Via email</p>
              <div className="text-end">
                <button className="bg-[#0083db] text-white px-2 rounded">
                  Edit
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 p-3">
              <h6>Which classes do you want to get notified from</h6>
              <p className="text-end">All classes</p>
              <div className="text-end">
                <button className="bg-[#0083db] text-white px-2 rounded">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <h5 className="font-semibold text-2xl">Danger Zone</h5>
        <div className="grid grid-cols-2 border border-red-500 mt-2 mb-10 p-3">
          <div className="col-span-2">
            {/* <DeleteUser email={session.user.email} /> */}
          </div>
        </div>

        {/* password change dialog */}
        <dialog id="my_modal_5" className="modal">
          <form
            method="dialog"
            className="modal-box w-96 max-w-5xl"
            onSubmit={handleSubmit(handlePasswordChange)}
          >
            <div className="form-control w-full max-w-xs">
              <label className="label"> <span className="label-text">Current password</span></label>
              <input
                {...register("current_password", {
                  required: "Password is required!",
                  pattern: { value: /(?=.*[!@#$&*])/, message: 'password should be minimum one special character' },
                  minLength: { value: 6, message: 'password should be must 6 characters' }
                })} placeholder="current password"
                type="password" className="input input-bordered w-full max-w-xs" />
              {errors?.current_password && <p className='text-red-600'>{errors?.current_password.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label"> <span className="label-text">New password</span></label>
              <input
                {...register("new_password", {
                  required: "Password is required!",
                  pattern: { value: /(?=.*[!@#$&*])/, message: 'password should be minimum one special character' },
                  minLength: { value: 6, message: 'password should be must 6 characters' }
                })} placeholder="new password"
                type="password" className="input input-bordered w-full max-w-xs" />
              {errors?.new_password && <p className='text-red-600'>{errors?.new_password.message}</p>}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label"> <span className="label-text">confirm password</span></label>
              <input
                {...register("confirm_password", {
                  required: "Password is required!",
                  pattern: { value: /(?=.*[!@#$&*])/, message: 'password should be minimum one special character' },
                  minLength: { value: 6, message: 'password should be must 6 characters' }
                })} placeholder="Confirm password"
                type="password" className="input input-bordered w-full max-w-xs" />
              {errors?.confirm_password && <p className='text-red-600'>{errors?.confirm_password.message}</p>}
            </div>

            <div className="modal-action">
              <button className="btn bg-[#0083db] text-white" type="submit">
                Update Password
              </button>
              <button
                className="btn bg-[#d83e26] text-white"
                onClick={() => window.my_modal_5.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      </div>
    );
  }

  return router.push('/login')

};

export default Settings;
