"use client";

export default function SuccessMessage({ area, isUpdate, }: { area: string; isUpdate: boolean }) {
  return (
    <div className="w-full max-w-md mx-auto 
    backdrop-blur-xl bg-yellow-500 border border-white/20 
    rounded-2xl p-8 shadow-2xl text-center">

      {/* Icon */}
      <div className="text-4xl mb-4">🎉</div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-white mb-2">
        {isUpdate ? "You’re on the list" : "You're on the list!"}
      </h2>

      {/* Message */}
      <p className="text-gray-300 mb-4">
        {isUpdate ? "You've updated your information." : "You're all set!"} We’ll notify you when we launch in {area?.replaceAll("-", " ") || "your area"}.
      </p>

      {/* Area */}
      <p className="text-black text-lg font-semibold capitalize">
        {area?.replaceAll("-", " ") || "your area"}
      </p>

      {/* Footer */}
      <p className="text-xs text-gray-600 mt-6">
        {isUpdate ? "Thanks for staying with us" : "Thanks for joining us"} 
      </p>
    </div>
  );
}