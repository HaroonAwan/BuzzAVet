'use client';

import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useOnboarding } from '../hooks/useOnboarding';
import { Switch } from '@/components/ui/switch';
import { TagInput } from '@/components/form-inputs/TagInput';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';
import { AddPhotoIcon } from '@/assets/icon-components';
import { DocumentUploadItem } from '@/components/shared/DocumentUploadItem';
import { setStep4Data } from '@/apis/onBoarding/onBoardingSlice';
import toast from 'react-hot-toast';

/**
 * Step 4: Health Snapshot
 * User can optionally add medical history and upload documents
 */
export default function Step4HealthSnapshot() {
  const dispatch = useDispatch();
  const { watch, setValue, uploadedDocuments, handleDocumentUpload, handleRemoveDocument } =
    useOnboarding();

  const enableMedicalHistory = watch('enableMedicalHistory');
  const allergies = watch('allergies');
  const chronicConditions = watch('chronicConditions');
  const previousDiagnosis = watch('previousDiagnosis');

  // Save health data to Redux
  React.useEffect(() => {
    dispatch(
      setStep4Data({
        enableMedicalHistory,
        allergies: allergies || [],
        chronicConditions: chronicConditions || [],
        previousDiagnosis: previousDiagnosis || [],
        documents: uploadedDocuments.filter((doc) => !doc.isUploading).map((doc) => doc.path),
      })
    );
  }, [
    enableMedicalHistory,
    allergies,
    chronicConditions,
    previousDiagnosis,
    uploadedDocuments,
    dispatch,
  ]);

  // Expose uploaded documents for submission
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__step4UploadedDocuments = uploadedDocuments.filter(
        (doc) => !doc.isUploading
      );
    }
  }, [uploadedDocuments]);

  const handleToggleMedicalHistory = (enabled: boolean) => {
    setValue('enableMedicalHistory', enabled);
  };

  const handleAllergiesChange = (tags: string[]) => {
    setValue('allergies', tags);
  };

  const handleChronicConditionsChange = (tags: string[]) => {
    setValue('chronicConditions', tags);
  };

  const handlePreviousDiagnosisChange = (tags: string[]) => {
    setValue('previousDiagnosis', tags);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentCount = uploadedDocuments.length;
    const availableSlots = 5 - currentCount;

    if (availableSlots <= 0) {
      toast.error('Maximum 5 documents allowed');
      e.target.value = '';
      return;
    }

    await handleDocumentUpload(files);
    e.target.value = '';
  };

  const isAnyUploading = uploadedDocuments.some((doc) => doc.isUploading);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__step4IsUploading = isAnyUploading;
    }
  }, [isAnyUploading]);

  return (
    <div className="mt-3 flex w-full flex-1 flex-col">
      <h1 className="thirty-six mb-10 font-semibold" style={{ color: theme.colors.text.default }}>
        Health Snapshot
      </h1>
      <p className="mb-6 max-w-142.5 text-base" style={{ color: theme.colors.text.secondary }}>
        Adding these details helps vets diagnose issues faster. You can skip this and add it later.
      </p>

      {/* Medical History Toggle */}
      <div className="mb-10 flex items-center justify-between border-b pb-5">
        <div>
          <label
            className="mb-1.5 block text-[18px] leading-6 font-semibold"
            style={{ color: theme.colors.text.default }}
          >
            Add medical history?
          </label>
          <p className="text-sm leading-4" style={{ color: theme.colors.text.tertiary }}>
            Allergies, chronic conditions, etc.
          </p>
        </div>
        <Switch
          checked={enableMedicalHistory}
          onCheckedChange={handleToggleMedicalHistory}
          size="md"
        />
      </div>

      {/* Medical History Fields */}
      {enableMedicalHistory && (
        <div className="mb-8 space-y-6">
          <div>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: theme.colors.text.default }}
            >
              Known Allergies
            </label>
            <TagInput
              value={allergies || []}
              onChange={handleAllergiesChange}
              placeholder="Type and press Enter"
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: theme.colors.text.default }}
            >
              Chronic Conditions
            </label>
            <TagInput
              value={chronicConditions || []}
              onChange={handleChronicConditionsChange}
              placeholder="Type and press Enter"
            />
          </div>

          <div>
            <label
              className="mb-1 block text-sm font-medium"
              style={{ color: theme.colors.text.default }}
            >
              Previous Diagnosis
            </label>
            <TagInput
              value={previousDiagnosis || []}
              onChange={handlePreviousDiagnosisChange}
              placeholder="Type and press Enter"
            />
          </div>
        </div>
      )}

      {/* Document Upload */}
      <div>
        <label
          className="mb-2 block text-sm font-semibold"
          style={{ color: theme.colors.text.default }}
        >
          Upload Document (Max 5)
        </label>

        {/* Uploaded Documents List */}
        {uploadedDocuments.length > 0 && (
          <div className="mb-4 space-y-3">
            {uploadedDocuments.map((doc, index) => (
              <DocumentUploadItem
                key={index}
                file={doc.file}
                isUploading={doc.isUploading}
                uploadProgress={doc.uploadProgress}
                onRemove={() => handleRemoveDocument(index)}
              />
            ))}
          </div>
        )}

        {/* Upload Area */}
        {uploadedDocuments.length < 5 && (
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              multiple
              onChange={handleFileChange}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
              id="document-upload"
              disabled={isAnyUploading}
            />
            <div
              className={cn(
                'min-h-30 w-full rounded-lg border-2 border-dashed',
                'flex flex-col items-center justify-center gap-3 p-6',
                'transition-colors',
                isAnyUploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              )}
              style={{
                borderColor: theme.colors.defaultBorder,
                backgroundColor: theme.colors.background.secondary,
              }}
              onMouseEnter={(e) => {
                if (!isAnyUploading) {
                  e.currentTarget.style.borderColor = theme.colors.border.secondary;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.colors.defaultBorder;
              }}
            >
              <AddPhotoIcon size={32} />
              <div className="text-center">
                <p
                  className="mb-1 text-sm font-medium"
                  style={{ color: theme.colors.text.secondary }}
                >
                  Upload Documents
                </p>
                <p className="text-xs" style={{ color: theme.colors.text.muted }}>
                  Vaccination cards, past prescriptions, etc. ({uploadedDocuments.length}/5)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
