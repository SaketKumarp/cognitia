"use client";

import React, { useCallback, useRef, useState } from "react";
import { Upload, FolderPlus, FileUp } from "lucide-react";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  }, []);

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Upload Files</h1>

      {/* Upload buttons */}
      <div className="flex gap-4 mb-6">
        {/* Upload files */}
        <label className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer flex items-center gap-2">
          <FileUp size={20} />
          Upload Files
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>

        {/* Upload folder */}
        <label className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer flex items-center gap-2">
          <FolderPlus size={20} />
          Upload Folder
          <input
            type="file"
            className="hidden"
            webkitdirectory="true"
            directory="true"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>

      {/* Drag and Drop Box */}
      <div
        ref={dropRef}
        onDragEnter={preventDefaults}
        onDragOver={preventDefaults}
        onDragLeave={preventDefaults}
        onDrop={onDrop}
        className="border-2 border-dashed border-blue-400 bg-white w-[80%] h-[300px] rounded-xl flex flex-col items-center justify-center text-gray-600"
      >
        <Upload size={60} className="text-blue-500 mb-4" />
        <p className="text-lg">Drag & drop files or folders here</p>
        <p className="text-sm text-gray-400 mt-2">or use the buttons above</p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-8 w-[80%] bg-white p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg mb-3">Files:</h2>

          <ul className="list-disc ml-6 text-gray-700">
            {files.map((file, index) => (
              <li key={index}>
                {file.webkitRelativePath || file.name}{" "}
                <span className="text-gray-400 text-sm">
                  ({Math.round(file.size / 1024)} KB)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
