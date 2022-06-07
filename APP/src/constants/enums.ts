export enum StatusMessage {
    invalid = "is/are empty",
    notFound = "not found",
    unknowun = "Something went wrong",
    success = "with success",
    missmatch = "missmatch",
    duplicate = "already exists",
    expired = "has expired"
}

export enum Status {
    OK = "OK",
    NOTOK = "NOTOK",
}

export enum HttpVerbs {
    GET = "GET",
    POST = "POST",
    PATCH = "PATHC",
    PUT = "PUT",
    DELETE = "DELETE"
}

export enum EVENTS {
    userCreate = "user.create",
    userDelete = "user.delete",
    planificationCreate = "planification.create",
    planificationDelete = "planification.delete"

}