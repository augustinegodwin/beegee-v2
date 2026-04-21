"use client"
import React from 'react';
import { ShoppingBag, Gift, Check, RefreshCw } from 'lucide-react';
import { OrderStateButton } from './orderStateButton';

interface TimelineProps {
    order: OrderDetails;
    user: User; // Using your user object structure
}

export default function OrderTimeline({ order, user }: TimelineProps) {
    const isSale = order.forSale;
    const currentStatus = order.status;

    // Internal Date Formatter
    const formatDate = (dateString: string) => {
        if (!dateString) return "-- --";
        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(new Date(dateString));
    };

    // Define the stages based on order type
    const saleStages = [
        { id: 'paid', label: 'Order Confirmed', sub: 'Order Placed and confirmed', icon: ShoppingBag, color: "text-orange-300" },
        { id: 'delivered', label: 'Order Delivered', sub: 'Seller has marked as delivered', icon: Gift, color: "text-purple-300" },
        { id: 'completed', label: 'Order Completed', sub: 'Transaction closed successfully', icon: Check, color: "text-green-400" }
    ];

    const rentStages = [
        { id: 'paid', label: 'Order Confirmed', sub: 'Rental confirmed', icon: ShoppingBag, color: "text-orange-300" },
        { id: 'delivered', label: 'Item Received', sub: 'Item is currently with customer', icon: Gift, color: "text-purple-300" },
        { id: 'return', label: 'Item Returned', sub: 'Awaiting seller confirmation', icon: RefreshCw, color: "text-blue-300" },
        { id: 'completed', label: 'Rental Completed', sub: 'Item returned and verified', icon: Check, color: "text-green-400" }
    ];

    const stages = isSale ? saleStages : rentStages;

    // Logic to determine if a stage is finished, active, or pending
    const getStageStatus = (stageId: string) => {
        const statusOrder = isSale 
            ? ['paid', 'delivered', 'completed'] 
            : ['paid', 'delivered', 'return', 'completed'];
        
        const currentIndex = statusOrder.indexOf(currentStatus);
        const stageIndex = statusOrder.indexOf(stageId);

        if (stageIndex < currentIndex || currentStatus === 'completed') return 'completed';
        if (stageIndex === currentIndex) return 'active';
        return 'pending';
    };

    return (
        <div className='flex flex-col gap-4 border-t border-dashed border-gray-200 pt-5'>
            <span className="text-(--secondary) leading-body tracking-body title-font">
                Timeline
            </span>
            <div className="w-full flex flex-col">
                {stages.map((stage, index) => {
                    const state = getStageStatus(stage.id);
                    const isLast = index === stages.length - 1;
                    const Icon = stage.icon;

                    return (
                        <div key={stage.id} className={`relative flex gap-5 items-start ${!isLast ? 'pb-8' : ''}`}>
                            {/* Connecting Line */}
                            {!isLast && (
                                <div className={`absolute left-5 top-10 w-[1px] h-full ${
                                    state === 'completed' ? 'bg-gray-200' : 'border-l border-dashed border-gray-300'
                                }`} />
                            )}

                            {/* Icon Circle */}
                            <div className={`relative z-10 aspect-square flex justify-center items-center h-10 rounded-full border bg-white ${
                                state === 'pending' ? 'border-dashed border-gray-200 bg-gray-50' : 'border-gray-200'
                            }`}>
                                <Icon 
                                    size={20} 
                                    className={state === 'pending' ? 'text-gray-300' : stage.color} 
                                />
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 flex flex-col gap-1">
                                <span className={`line-clamp-1 leading-body tracking-body title-font ${
                                    state === 'pending' ? 'text-gray-400 italic' : 'text-black'
                                }`}>
                                    {stage.label} {state === 'pending' && '(pending)'}
                                </span>
                                <p className={`inline-flex text-xs leading-body tracking-body title-font ${
                                    state === 'pending' ? 'text-gray-300' : 'text-(--secondary)'
                                }`}>
                                    {stage.sub}
                                </p>
                            </div>

                            {/* Date Column */}
                            <div className="flex h-10 items-start">
                                <p className={`inline-flex text-sm leading-body tracking-body title-font ${
                                    state === 'pending' ? 'text-gray-300' : 'text-(--secondary)'
                                }`}>
                                    {(state === 'completed' || state === 'active') ? formatDate(order.updatedAt) : '-- --'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Complete Order Button Section */}
            <div className="w-full mt-5 flex justify-end">
                {order && user && (
                    <OrderStateButton order={order} user={user} />
                )}
            </div>
        </div>
    );
};