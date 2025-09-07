import React, { useState } from "react";
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
import { createClient } from "../../redux/action/user";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClient = ({ open, setOpen, scroll }) => {
    const dispatch = useDispatch();
    const { isFetching } = useSelector((state) => state.user);

    const initialState = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        phone: "",
        email: "",
    };

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setForm((p) => ({ ...p, [field]: value }));
        if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
    };

    const handleClose = () => {
        setOpen(false);
        setForm(initialState);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const errs = {};
        if (!form.firstName?.trim()) errs.firstName = "First name is required";
        if (!form.lastName?.trim()) errs.lastName = "Last name is required";
        if (!form.username?.trim()) errs.username = "Username is required";
        if (!form.password?.trim()) errs.password = "Password is required";
        if (!form.phone?.trim()) errs.phone = "Phone is required";

        setErrors(errs);
        if (Object.keys(errs).length) return;

        dispatch(createClient(form, setOpen));
        setForm(initialState);
        setErrors({});
    };

    return (
        <Dialog
            scroll={scroll}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            fullWidth="sm"
            maxWidth="sm"
            aria-describedby="create-client-dialog"
        >
            <DialogTitle className="flex items-center justify-between">
                <div className="text-sky-400 font-primary">Add New Client</div>
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
                                        value={form.firstName}
                                        onChange={(e) => handleChange("firstName", e.target.value)}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-4 text-lg">Last Name</td>
                                <td className="pb-4">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={form.lastName}
                                        onChange={(e) => handleChange("lastName", e.target.value)}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="pb-4 text-lg">Username</td>
                                <td className="pb-4">
                                    <TextField
                                        size="small"
                                        fullWidth
                                        value={form.username}
                                        onChange={(e) => handleChange("username", e.target.value)}
                                        error={!!errors.username}
                                        helperText={errors.username}
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
                                        value={form.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td className="flex items-start pt-2 text-lg">Password</td>
                                <td className="pb-4">
                                    <TextField
                                        type="password"
                                        size="small"
                                        fullWidth
                                        value={form.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                        error={!!errors.password}
                                        helperText={errors.password}
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
                                        value={form.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        error={!!errors.phone}
                                        helperText={errors.phone}
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

export default CreateClient;
