import { useState, useEffect } from "react";
import { getSystemLogs, exportLogs } from "./logger";
import { Download } from "lucide-react";

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    setLogs(getSystemLogs());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
          <button
            onClick={exportLogs}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.length > 0 ? (
                  logs.map((log, index) => {
                    // Parse the log entry
                    const timestampEnd = log.indexOf("]") + 1;
                    const timestamp = log.substring(0, timestampEnd);

                    const typeStart = log.indexOf("[", timestampEnd) + 1;
                    const typeEnd = log.indexOf("]", typeStart);
                    const type = log.substring(typeStart, typeEnd);

                    const message = log.substring(typeEnd + 2);

                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              type === "bug"
                                ? "bg-red-100 text-red-800"
                                : type === "feat"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {message}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No logs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogs;
