  // src/services/api.ts

  // ==================== DASHBOARD ====================

  export type DashboardData = {
    citizens: number;
    projects: number;
    requests: number;
    officers: number;
  };

  // ==================== REQUESTS ====================

  export type RequestStatus =
    | "Pending"
    | "In Progress"
    | "Approved"
    | "Rejected";

  export type RequestData = {
    id: string;
    requestId: string;
    citizenName: string;
    requestType: string;
    department: string;
    status: RequestStatus;
    description: string;
  };

  const REQUESTS_STORAGE_KEY = "government_requests";

  const developmentRequests: RequestData[] = [
    {
      id: "REQ-001",
      requestId: "REQ-001",
      citizenName: "Aarav Sharma",
      requestType: "Birth Certificate",
      department: "Revenue",
      status: "Approved",
      description: "Birth certificate application",
    },
    {
      id: "REQ-002",
      requestId: "REQ-002",
      citizenName: "Priya Patil",
      requestType: "Income Certificate",
      department: "Revenue",
      status: "Pending",
      description: "Income certificate verification",
    },
    {
      id: "REQ-003",
      requestId: "REQ-003",
      citizenName: "Rahul Deshmukh",
      requestType: "Water Connection",
      department: "Water Supply",
      status: "In Progress",
      description: "New water connection request",
    },
  ];

  export const getRequests = async (): Promise<RequestData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const storedRequests = localStorage.getItem(
      REQUESTS_STORAGE_KEY
    );

    if (!storedRequests) {
      localStorage.setItem(
        REQUESTS_STORAGE_KEY,
        JSON.stringify(developmentRequests)
      );

      return developmentRequests;
    }

    try {
      return JSON.parse(storedRequests);
    } catch {
      localStorage.removeItem(REQUESTS_STORAGE_KEY);
      return developmentRequests;
    }
  };

  export const saveRequests = (
    requests: RequestData[]
  ): void => {
    localStorage.setItem(
      REQUESTS_STORAGE_KEY,
      JSON.stringify(requests)
    );
  };

  export const addRequest = (
    request: RequestData
  ): void => {
    const requests = JSON.parse(
      localStorage.getItem(REQUESTS_STORAGE_KEY) || "[]"
    ) as RequestData[];

    saveRequests([...requests, request]);
  };

  export const updateRequest = (
    updatedRequest: RequestData
  ): void => {
    const requests = JSON.parse(
      localStorage.getItem(REQUESTS_STORAGE_KEY) || "[]"
    ) as RequestData[];

    const updatedRequests = requests.map(
      (request) =>
        request.id === updatedRequest.id
          ? updatedRequest
          : request
    );

    saveRequests(updatedRequests);
  };

  export const deleteRequest = (
    requestId: string
  ): void => {
    const requests = JSON.parse(
      localStorage.getItem(REQUESTS_STORAGE_KEY) || "[]"
    ) as RequestData[];

    const updatedRequests = requests.filter(
      (request) => request.id !== requestId
    );

    saveRequests(updatedRequests);
  };

  // ==================== CITIZENS ====================

  export type CitizenData = {
    id: number;
    citizenId: string;
    name: string;
    email: string;
    phone: string;
    department: string;
  };

  const CITIZENS_STORAGE_KEY = "government_citizens";

  export const getCitizens = (): CitizenData[] => {
    const storedCitizens = localStorage.getItem(
      CITIZENS_STORAGE_KEY
    );

    if (!storedCitizens) {
      return [];
    }

    try {
      return JSON.parse(storedCitizens);
    } catch {
      return [];
    }
  };

  export const saveCitizens = (
    citizens: CitizenData[]
  ): void => {
    localStorage.setItem(
      CITIZENS_STORAGE_KEY,
      JSON.stringify(citizens)
    );
  };

  export const addCitizen = (
    citizen: CitizenData
  ): void => {
    const citizens = getCitizens();

    saveCitizens([...citizens, citizen]);
  };

  export const updateCitizen = (
    updatedCitizen: CitizenData
  ): void => {
    const citizens = getCitizens();

    const updatedCitizens = citizens.map(
      (citizen) =>
        citizen.id === updatedCitizen.id
          ? updatedCitizen
          : citizen
    );

    saveCitizens(updatedCitizens);
  };

  export const deleteCitizen = (
    citizenId: number
  ): void => {
    const citizens = getCitizens();

    const updatedCitizens = citizens.filter(
      (citizen) => citizen.id !== citizenId
    );

    saveCitizens(updatedCitizens);
  };

  // ==================== OFFICERS ====================

  export type OfficerData = {
    id: number;
    officerId: string;
    name: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
  };

  const OFFICERS_STORAGE_KEY = "government_officers";

  export const getOfficers = (): OfficerData[] => {
    const storedOfficers = localStorage.getItem(
      OFFICERS_STORAGE_KEY
    );

    if (!storedOfficers) {
      return [];
    }

    try {
      return JSON.parse(storedOfficers);
    } catch {
      return [];
    }
  };

  export const saveOfficers = (
    officers: OfficerData[]
  ): void => {
    localStorage.setItem(
      OFFICERS_STORAGE_KEY,
      JSON.stringify(officers)
    );
  };

  export const addOfficer = (
    officer: OfficerData
  ): void => {
    const officers = getOfficers();

    saveOfficers([...officers, officer]);
  };

  export const updateOfficer = (
    updatedOfficer: OfficerData
  ): void => {
    const officers = getOfficers();

    const updatedOfficers = officers.map(
      (officer) =>
        officer.id === updatedOfficer.id
          ? updatedOfficer
          : officer
    );

    saveOfficers(updatedOfficers);
  };

  export const deleteOfficer = (
    officerId: number
  ): void => {
    const officers = getOfficers();

    const updatedOfficers = officers.filter(
      (officer) => officer.id !== officerId
    );

    saveOfficers(updatedOfficers);
  };

  // ==================== PROJECTS ====================

  export type ProjectData = {
    id: number;
    projectName: string;
    department: string;
    budget: string;
    status: string;
  };

  const PROJECTS_STORAGE_KEY = "government_projects";

  export const getProjects = (): ProjectData[] => {
    const storedProjects = localStorage.getItem(
      PROJECTS_STORAGE_KEY
    );

    if (!storedProjects) {
      return [];
    }

    try {
      return JSON.parse(storedProjects);
    } catch {
      return [];
    }
  };

  export const saveProjects = (
    projects: ProjectData[]
  ): void => {
    localStorage.setItem(
      PROJECTS_STORAGE_KEY,
      JSON.stringify(projects)
    );
  };

  export const addProject = (
    project: ProjectData
  ): void => {
    const projects = getProjects();

    saveProjects([...projects, project]);
  };

  export const updateProject = (
    updatedProject: ProjectData
  ): void => {
    const projects = getProjects();

    const updatedProjects = projects.map(
      (project) =>
        project.id === updatedProject.id
          ? updatedProject
          : project
    );

    saveProjects(updatedProjects);
  };

  export const deleteProject = (
    projectId: number
  ): void => {
    const projects = getProjects();

    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );

    saveProjects(updatedProjects);
  };

  // ==================== DASHBOARD DATA ====================

  export const getDashboardData =
    async (): Promise<DashboardData> => {
      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );

      const [requests] = await Promise.all([
        getRequests(),
      ]);

      const citizens = getCitizens();
      const officers = getOfficers();
      const projects = getProjects();

      return {
        citizens: citizens.length,
        projects: projects.length,
        requests: requests.length,
        officers: officers.length,
      };
    };