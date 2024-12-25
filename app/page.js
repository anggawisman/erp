"use client";
import { useState } from "react";
import { MoreVertical, Clock, Users, Laptop, DollarSign } from "lucide-react";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer } from "recharts";

const weeklyData = [
  { value: 30 },
  { value: 55 },
  { value: 45 },
  { value: 75 },
  { value: 45 },
  { value: 55 },
  { value: 45 },
];

const profitData = [
  { value: 35 },
  { value: 45 },
  { value: 40 },
  { value: 50 },
  { value: 45 },
  { value: 60 },
];

export default function Dashboard() {
  const [selected, setSelected] = useState("Billing");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white-200 to-indigo-100 bg-white p-6 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Congratulations Card */}
          <div className="rounded-lg backdrop-blur-sm bg-white/10 border border-white/75 shadow-md p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-blue-950">
                  Congratulations John! 🎉
                </h2>
                <p className="text-blue-950/70">Best seller of the month</p>
                <div className="text-3xl font-bold text-purple-300">$42.8k</div>
                <p className="text-blue-950/70">78% of target 🚀</p>
                <button className="px-4 py-2 bg-purple-500/80 hover:bg-purple-600/80 backdrop-blur-sm text-white border border-purple-400/20 rounded-md transition-colors">
                  View Sales
                </button>
              </div>
              <div className="h-32 w-32">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  alt="Trophy"
                  className="h-full w-full object-contain opacity-80"
                />
              </div>
            </div>
          </div>

          {/* Transactions Card */}
          <div className="rounded-lg backdrop-blur-sm bg-white/10 border border-white/75 shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-950">
                Transactions
              </h3>
              <button className="text-blue-950/70 hover:text-blue-950 hover:bg-white/10 p-1 rounded-full transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm mb-4 text-blue-950/70">
              Total 48.5% Growth 🤑 this month
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-300" />
                  <span className="text-sm font-medium text-blue-950/70">
                    Sales
                  </span>
                </div>
                <p className="text-xl font-bold text-blue-950">245k</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-300" />
                  <span className="text-sm font-medium text-blue-950/70">
                    Users
                  </span>
                </div>
                <p className="text-xl font-bold text-blue-950">12.5k</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-orange-300" />
                  <span className="text-sm font-medium text-blue-950/70">
                    Products
                  </span>
                </div>
                <p className="text-xl font-bold text-blue-950">1.54k</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-blue-300" />
                  <span className="text-sm font-medium text-blue-950/70">
                    Revenue
                  </span>
                </div>
                <p className="text-xl font-bold text-blue-950">$88k</p>
              </div>
            </div>
          </div>

          {/* Weekly Overview */}
          <div className="rounded-lg backdrop-blur-sm bg-white/10 border border-white/75 shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-950">
                Weekly Overview
              </h3>
              <button className="text-blue-950/70 hover:text-blue-950 hover:bg-white/10 p-1 rounded-full transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <Bar dataKey="value" fill="rgba(147, 51, 234, 0.5)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-blue-950">45%</p>
              <p className="text-sm text-blue-950/70">
                Your sales performance is 45% 🤑 better compared to last month
              </p>
              <button className="w-full mt-4 px-4 py-2 bg-purple-500/80 hover:bg-purple-600/80 backdrop-blur-sm text-white border border-purple-400/20 rounded-md transition-colors">
                Details
              </button>
            </div>
          </div>

          {/* Total Earning */}
          <div className="rounded-lg backdrop-blur-sm bg-white/10 border border-white/75 shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-950">
                Total Earning
              </h3>
              <button className="text-blue-950/70 hover:text-blue-950 hover:bg-white/10 p-1 rounded-full transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-950">
                    $24,895
                  </span>
                  <span className="text-sm text-green-300">↑ 10%</span>
                </div>
                <p className="text-sm text-blue-950/70">
                  Compared to $84,325 last year
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    name: "Zipcar",
                    tech: "Vuejs, React & HTML",
                    amount: "$24,895.65",
                  },
                  {
                    name: "Bitbank",
                    tech: "Sketch, Figma & XD",
                    amount: "$8,650.20",
                  },
                  {
                    name: "Aviato",
                    tech: "HTML & Angular",
                    amount: "$1,245.80",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-blue-950">{item.name}</p>
                      <p className="text-sm text-blue-950/70">{item.tech}</p>
                    </div>
                    <p className="font-medium text-blue-950">{item.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Total Profit Card */}
          <div className="rounded-lg backdrop-blur-sm bg-white/10 border border-white/75 shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-950">
                Total Profit
              </h3>
              <span className="text-2xl font-bold text-blue-950">$86.4k</span>
            </div>
            <div className="h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#D8B4FE"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Profit Card */}
          <div className="rounded-lg backdrop-blur-sm bg-white/10 border border-white/75 shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-950">
                  Total Profit
                </h3>
                <p className="text-sm text-blue-950/70">Weekly Profit</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-950">$25.6k</p>
                <p className="text-sm text-green-300">+42%</p>
              </div>
            </div>
          </div>

          {/* Sessions Card */}
          <div className="rounded-lg backdrop-blur-sm bg-white/10 border border-white/75 shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-950">Sessions</h3>
              <p className="text-2xl font-bold text-blue-950">2,856</p>
            </div>
            <div className="flex items-center justify-between h-[100px]">
              {[45, 80, 45, 70, 45].map((height, index) => (
                <div
                  key={index}
                  className="w-4 bg-purple-500/50 rounded"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
