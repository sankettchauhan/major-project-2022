import Swal from "sweetalert2";

export const addArticleSwal = (title) =>
  Swal.fire({
    titleText: "Are you sure you want to continue?",
    text: `You are creating an article with title "${title}". You can only edit it later on, after adding all sections to the article.`,
    icon: "warning",
    confirmButtonText: "Yes",
    denyButtonText: "No",
    showDenyButton: true,
  });

export const addSectionSwal = (title) =>
  Swal.fire({
    titleText: "Are you sure you want to continue?",
    text: `You are creating a section with title "${title}". You can only edit it later on, after adding all sections to the article.`,
    icon: "warning",
    confirmButtonText: "Yes",
    denyButtonText: "No",
    showDenyButton: true,
  });

export const deleteArticleConfirmationSwal = (title) =>
  Swal.fire({
    titleText: `Are you sure you want to delete article with title "${title}"?`,
    text: `Please be sure before deleting the article. You won't be able to undo this action.`,
    icon: "success",
    confirmButtonText: "Yes",
    denyButtonText: "No",
    showDenyButton: true,
  });

export const deleteArticleDeclinedSwal = (title) =>
  Swal.fire({
    titleText: `Article was not deleted.`,
    text: `Article with title "${title}" was not deleted.`,
    icon: "error",
  });

export const deleteArticleErrorSwal = (title) =>
  Swal.fire({
    titleText: `An error occured while deleting the article.`,
    text: `Article with title "${title}" was not deleted.`,
    icon: "error",
  });

export const deleteArticleSuccessSwal = (title) =>
  Swal.fire({
    titleText: `Article deleted successfully.`,
    text: `Article with title "${title}" was deleted successfully`,
    icon: "success",
  });
