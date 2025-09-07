import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Divider,
    Dialog,
    DialogContent,
    DialogTitle,
    Slide,
    DialogActions,
    TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { updateUser } from "../../redux/action/user";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const EditClient = ({ open, setOpen }) => {
    const dispatch = useDispatch();
    const { currentEmployee, isFetching } = useSelector((state) => state.user);

    const initialState = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
    };

    const [form, setForm] = useState(initialState);

    useEffect(() => {
        setForm(currentEmployee || initialState);
    }, [currentEmployee]);

    const handleInputChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // keep role as 'client' for reducer update targeting
        dispatch(updateUser(currentEmployee._id, form, "client"));
        setOpen(false);
    };

    return (
        <Dialog
            scroll="paper"
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth="sm"
            maxWidth="sm"
            aria-describedby="edit-client-dialog"
        >
            <DialogTitle className="flex items-center justify-between">
                <div className="text-sky-400 font-primary">Edit Client</div>
                <div className="cursor-pointer" onClick={handleClose}>
                    <PiXLight className="text-[25px]" />
                </div>
            </DialogTitle>

            <DialogContent>
                <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
                    <div className="text-xl flex justify-start items-center gap-2 font-normal">
                        <PiNotepad size={23} />
                        <span>Client Details</span>
                    </div>
                    <Divider />
                    <table className="mt-4">
                        <tbody>
                            <tr>
                                <td className="pb-4 text-lg">First Name</td>
                                <td className="pb-4">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={form?.firstName || ""}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-4 text-lg">Last Name</td>
                                <td className="pb-4">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={form?.lastName || ""}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-4 text-lg">Email</td>
                                <td className="pb-4">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        placeholder="Optional"
                                        value={form?.email || ""}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-4 text-lg">Username</td>
                                <td className="pb-4">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={form?.username || ""}
                                        onChange={(e) => handleInputChange("username", e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="flex items-start pt-2 text-lg">Phone</td>
                                <td className="pb-4">
                                    <TextField
                                        type="number"
                                        size="small"
                                        fullWidth
                                        value={form?.phone || ""}
                                        onChange={(e) => handleInputChange("phone", e.target.value)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DialogContent>

            <DialogActions>
                <button
                    onClick={handleClose}
                    type="reset"
                    className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
                >
                    {isFetching ? "Submitting..." : "Submit"}
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default EditClient;
