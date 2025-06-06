// "use client";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa"];

// type Job = {
//   finalResult?: string;
//   submitted: boolean;
// };

// interface StatsSummaryProps {
//   jobs: Job[];
// }

// // export default function StatsSummary({ jobs }) {
//   export default function StatsSummary({ jobs }: StatsSummaryProps) {
//   const finalResultCounts = jobs.reduce((acc, job) => {
//     const result = job.finalResult || "Pending";
//     acc[result] = (acc[result] || 0) + 1;
//     return acc;
//   }, {});

//   const submittedCounts = {
//     Submitted: jobs.filter((j) => j.submitted).length,
//     NotSubmitted: jobs.filter((j) => !j.submitted).length,
//   };

//   const resultData = Object.entries(finalResultCounts).map(([key, value]) => ({
//     name: key,
//     value,
//   }));

//   const submitData = Object.entries(submittedCounts).map(([key, value]) => ({
//     name: key,
//     value,
//   }));

//   return (
//     <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
//       {/* Pie Chart for Final Results */}
//       <div className="rounded-xl border bg-white p-6 shadow">
//         <h3 className="mb-4 text-lg font-semibold">Final Result Breakdown</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <PieChart>
//             <Pie
//               data={resultData}
//               dataKey="value"
//               nameKey="name"
//               outerRadius={80}
//               label
//             >
//               {resultData.map((_, index) => (
//                 <Cell key={index} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Bar Chart for Submitted */}
//       <div className="rounded-xl border bg-white p-6 shadow">
//         <h3 className="mb-4 text-lg font-semibold">Submission Status</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={submitData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" fill="#60a5fa" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }

"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa"];

type Job = {
  finalResult?: string;
  submitted: boolean;
};

interface StatsSummaryProps {
  jobs: Job[];
}

export default function StatsSummary({ jobs }: StatsSummaryProps) {
  const finalResultCounts = jobs.reduce(
    (acc, job) => {
      const result = job.finalResult || "Pending";
      acc[result] = (acc[result] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const submittedCounts = {
    Submitted: jobs.filter((j) => j.submitted).length,
    NotSubmitted: jobs.filter((j) => !j.submitted).length,
  };

  const resultData = Object.entries(finalResultCounts).map(([key, value]) => ({
    name: key,
    value,
  }));

  const submitData = Object.entries(submittedCounts).map(([key, value]) => ({
    name: key,
    value,
  }));

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="rounded-xl border bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Final Result Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={resultData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {resultData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-semibold">Submission Status</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={submitData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
