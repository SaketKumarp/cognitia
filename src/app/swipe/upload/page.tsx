"use client";

import React, { useCallback, useRef, useState } from "react";
import { Upload, FolderPlus, FileUp } from "lucide-react";
import { toast } from "sonner";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const handleFiles = (newFiles: FileList | null, source: string) => {
    if (!newFiles || newFiles.length === 0) {
      toast.error(`No files selected from ${source}`);
      return;
    }

    const arr = Array.from(newFiles);

    setFiles((prev) => [...prev, ...arr]);

    toast.success(
      `${arr.length} ${arr.length === 1 ? "file" : "files"} uploaded from ${source}`
    );
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;

    if (!droppedFiles || droppedFiles.length === 0) {
      toast.error("Drop failed — no files detected");
      return;
    }

    handleFiles(droppedFiles, "drag & drop");
  }, []);

  const preventDefaults = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="
        min-h-screen 
        bg-cover bg-center bg-no-repeat
        flex flex-col items-center
        px-6 py-10
      "
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
          Upload Files
        </h1>

        {/* Upload Buttons */}
        <div className="flex gap-6 justify-center mb-8 flex-wrap">
          {/* Upload files */}
          <label className="px-6 py-3 bg-blue-600/80 hover:bg-blue-600 transition text-white font-medium rounded-xl cursor-pointer flex items-center gap-2 shadow-lg">
            <FileUp size={22} />
            Upload Files
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files, "file picker")}
            />
          </label>

          {/* Upload folder */}
          <label className="px-6 py-3 bg-purple-600/80 hover:bg-purple-600 transition text-white font-medium rounded-xl cursor-pointer flex items-center gap-2 shadow-lg">
            <FolderPlus size={22} />
            Upload Folder
            <input
              type="file"
              className="hidden"
              webkitdirectory="true"
              directory="true"
              onChange={(e) => handleFiles(e.target.files, "folder picker")}
            />
          </label>
        </div>

        {/* Drag & Drop Box */}
        <div
          ref={dropRef}
          onDragEnter={preventDefaults}
          onDragOver={preventDefaults}
          onDragLeave={preventDefaults}
          onDrop={onDrop}
          className="
            border-2 border-dashed border-white/40 bg-white/10 
            w-full h-[300px] rounded-2xl
            flex flex-col items-center justify-center 
            text-white transition backdrop-blur-xl
            hover:bg-white/20 hover:border-white
          "
        >
          <Upload size={70} className="text-white mb-4 drop-shadow-xl" />
          <p className="text-xl font-semibold drop-shadow-md">
            Drag & drop your files or folders here
          </p>
          <p className="text-sm text-white/70 mt-2">or use the buttons above</p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-10 bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-xl shadow-xl">
            <h2 className="font-semibold text-2xl text-white mb-4">
              Uploaded Files:
            </h2>

            <ul className="list-disc ml-6 text-white/90 space-y-2">
              {files.map((file, index) => (
                <li key={index}>
                  {file.webkitRelativePath || file.name}{" "}
                  <span className="text-white/70 text-sm">
                    ({Math.round(file.size / 1024)} KB)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
