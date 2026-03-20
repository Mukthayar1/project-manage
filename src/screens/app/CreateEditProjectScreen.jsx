import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useProjects } from '../../hooks/useProjects';
import styles from './CreateEditProjectScreen.module.css';

const CreateEditProjectModal = ({ project, onClose }) => {
  console.log('curent project===>', project);

  const isEdit = !!project;
  const { saveProject, loading } = useProjects();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm({
    defaultValues: {
      name: '',
      owner: '',
      status: 'Active',
      description: '',
    },
  });

  console.log('edit===', isEdit);

  useEffect(() => {
    if (isEdit) {
      reset({
        name: project.name,
        owner: project.owner,
        status: project.status,
        description: project.description || '',
      });
      console.log('form reset with:', project.name);
    }
  }, [project]);

  const onSubmit = async (data) => {
    console.log('data', data);
    console.log('isEdit:', isEdit);

    await saveProject(
      isEdit ? { ...data, id: project.id, progress: project.progress, createdAt: project.createdAt } : data,
      isEdit
    );
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target == e.currentTarget) {
      console.log('overlay clicked');
      handleCancel();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalTop}>
          <h2 className={styles.modalHeading}>
            {isEdit ? 'Edit Project' : 'New Project'}
          </h2>
          <button className={styles.closeModalBtn} onClick={handleCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formFields}>
            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Project Name *</label>
              <input
                className={`${styles.textField} ${errors.name ? styles.fieldError : ''}`}
                placeholder="Project Name"
                {...register('name', { required: 'Project name is required' })}
              />
              {errors.name && (
                <span className={styles.errorMsg}>{errors.name.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Owner *</label>
              <input
                className={`${styles.textField} ${errors.owner ? styles.fieldError : ''}`}
                placeholder="Client Name"
                {...register('owner', { required: 'Owner is required' })}
              />
              {errors.owner && (
                <span className={styles.errorMsg}>{errors.owner.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Status</label>
              <select className={styles.selectField} {...register('status')}>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.fieldLabel}>Description</label>
              <textarea
                className={styles.textareaField}
                placeholder="Project Description"
                {...register('description')}
              />
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditProjectModal;