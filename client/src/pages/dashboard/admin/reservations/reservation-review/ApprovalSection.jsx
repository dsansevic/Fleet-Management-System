import { useState } from "react";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import ButtonWithIcon from "@components/ui/ButtonWithIcon"; 
import Button from "@components/ui/Button"; 

const ApprovalSection = ({
    onApprove,
    onReject,
    onDecideLater,
    rejectReason,
    setRejectReason,
    approveError
}) => {
    const [showRejectReason, setShowRejectReason] = useState(false);

    const handleReject = () => {
        onReject(rejectReason);
        setShowRejectReason(false);
    };

    return (
        <section className="my-4 w-full">
            {approveError && (
                <p className="text-error text-sm my-4">{approveError}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ButtonWithIcon
                    icon={CheckCircleIcon}
                    label="Approve"
                    onClick={onApprove}
                    color="green-500"
                />

                <div className="flex flex-col w-full">
                    {!showRejectReason ? (
                        <ButtonWithIcon
                            icon={XCircleIcon}
                            label="Reject"
                            onClick={() => setShowRejectReason(true)}
                            color="red-500"
                        />
                    ) : (
                        <>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gray-300 mb-2"
                                rows="2"
                                placeholder="Reason for rejection"
                                value={rejectReason}
                                onChange={(e) => setRejectReason(e.target.value)}
                            ></textarea>
                               <div className="flex w-full gap-4">
                                <Button
                                        label="Close"
                                        onClick={() => setShowRejectReason(false)}
                                        className="flex-1"
                                    />
                                    <Button
                                        label="Submit"
                                        onClick={handleReject}
                                        className="flex-1 bg-orange-200"
                                    />
                                </div>
                        </>
                    )}
                </div>

                <ButtonWithIcon
                    icon={ClockIcon}
                    label="Decide Later"
                    onClick={onDecideLater}
                    color="gray-500"
                />
            </div>
        </section>
    );
};

export default ApprovalSection;