import { useState, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { mediaRule, messageRule, nameRule } from '@/lib/validationRules';
import { toast } from 'react-hot-toast';
import { useUploadFileMutation } from '@/apis/fileUpload/fileUploadApi';

interface AddNotesFormData {
  noteTitle: string;
  noteContent: string;
  media: File | null | undefined;
}

export interface UploadedDocument {
  id: string;
  path: string;
  fileName: string;
  fileSize: number;
}

interface SubmitPayload {
  noteTitle: string;
  noteContent: string;
  documents: UploadedDocument[];
}

const addNotesSchema = yup.object({
  noteTitle: nameRule,
  noteContent: messageRule,
  media: mediaRule,
});

export const useAddNotes = () => {
  const [activeTab, setActiveTab] = useState<'add' | 'import'>('import'); //TODO: default to 'add' after import functionality is ready
  const [uploadedDocuments, setUploadedDocuments] = useState<
    Array<
      UploadedDocument & {
        file: File;
        isUploading: boolean;
        uploadProgress: number;
      }
    >
  >([]);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  console.log('🚀 ~ AddNotes ~ uploadedDocuments:', uploadedDocuments);
  const [uploadFile] = useUploadFileMutation();
  const isAnyUploading = uploadedDocuments.some((doc) => doc.isUploading);

  const handleRemoveDocument = useCallback((index: number) => {
    setUploadedDocuments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleDocumentUpload = useCallback(
    async (files: File[]) => {
      const MAX_FILE_SIZE_MB = 5;
      const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

      const currentCount = uploadedDocuments.length;
      const availableSlots = 5 - currentCount;

      if (availableSlots <= 0) {
        toast.error('Maximum 5 documents allowed');
        return;
      }

      // Validate file sizes
      const invalidFiles = files.filter((file) => file.size > MAX_FILE_SIZE_BYTES);
      if (invalidFiles.length > 0) {
        const invalidFileNames = invalidFiles.map((f) => f.name).join(', ');
        toast.error(`File size cannot exceed ${MAX_FILE_SIZE_MB}MB: ${invalidFileNames}`);
        return;
      }

      const filesToUpload = files.slice(0, availableSlots);
      if (files.length > availableSlots) {
        toast.error(`Only ${availableSlots} more document(s) allowed`);
      }

      // Add files with uploading status
      const newDocuments: any[] = filesToUpload.map((file) => ({
        file,
        id: '',
        path: '',
        fileName: file.name,
        fileSize: file.size,
        isUploading: true,
        uploadProgress: 0,
      }));

      setUploadedDocuments((prev) => [...prev, ...newDocuments]);

      // Upload each file
      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await uploadFile(formData).unwrap();

          setUploadedDocuments((prev) =>
            prev.map((doc) =>
              doc.file === file
                ? {
                    ...doc,
                    id: response.id,
                    path: response.path,
                    fileSize: Number(response.fileSize),
                    isUploading: false,
                    uploadProgress: 100,
                  }
                : doc
            )
          );
        } catch (error) {
          toast.error(`Failed to upload ${file.name}`);
          setUploadedDocuments((prev) => prev.filter((doc) => doc.file !== file));
        }
      }
    },
    [uploadedDocuments, uploadFile]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    await handleDocumentUpload(files);
    e.target.value = '';
  };

  const handleTabChange = (tab: 'add' | 'import') => {
    setActiveTab(tab);
  };

  const handleNoteSelection = (noteId: string) => {
    setSelectedNotes((prev) => {
      if (prev.includes(noteId)) {
        return prev.filter((id) => id !== noteId);
      } else {
        return [...prev, noteId];
      }
    });
  };

  const handleImportNotes = () => {
    console.log('Selected notes:', selectedNotes);
  };

  const actions = useMemo(() => {
    if (activeTab === 'add') {
      return [
        {
          label: 'Import Notes',
          onClick: () => handleTabChange('import'),
          variant: 'outline' as 'outline',
        },
        {
          label: 'Add Note',
          type: 'submit' as 'submit',
          variant: 'pill' as 'pill',
        },
      ];
    }
    return [
      {
        label: 'Import',
        onClick: handleImportNotes,
        variant: 'pill' as 'pill',
      },
    ];
  }, [activeTab, selectedNotes]);

  const { control, handleSubmit } = useForm<AddNotesFormData>({
    resolver: yupResolver(addNotesSchema) as any,
    mode: 'onChange',
    defaultValues: {
      noteTitle: '',
      noteContent: '',
      media: null,
    },
  });

  const onSubmit = (data: AddNotesFormData) => {
    // Check if any documents are still uploading
    if (isAnyUploading) {
      toast.error('Please wait for all documents to finish uploading');
      return;
    }

    // Prepare the payload with uploaded documents
    const payload: SubmitPayload = {
      noteTitle: data.noteTitle,
      noteContent: data.noteContent,
      documents: uploadedDocuments.map((doc) => ({
        id: doc.id,
        path: doc.path,
        fileName: doc.fileName,
        fileSize: doc.fileSize,
      })),
    };

    console.log('Add notes form submitted:', payload);
    // TODO: Submit payload to your API
  };

  return {
    activeTab,
    uploadedDocuments,
    isAnyUploading,
    control,
    handleSubmit,
    onSubmit,
    handleRemoveDocument,
    handleFileChange,
    handleTabChange,
    actions,
    selectedNotes,
    handleNoteSelection,
  };
};
