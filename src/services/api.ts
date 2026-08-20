// src/services/api.ts

// ================================
// API RESPONSE TYPES
// ================================

export type DashboardData = {
  citizens: number;
  projects: number;
  requests: number;
  officers: number;
};

export type RequestData = {
  id: string;
  requestId: string;
  citizenName: string;
  requestType: string;
  department: string;
  status: string;
  description: string;
};

// ================================
// DEVELOPMENT DATA ADAPTER
// ================================
//
// IMPORTANT:
// Backend/API contract अजून team कडून मिळालेला नाही.
// त्यामुळे हा adapter temporary development layer आहे.
//
// नंतर backend API मिळाल्यावर फक्त या service layer मधील
// implementation बदलायची आहे.
// UI components बदलण्याची गरज पडू नये हा याचा उद्देश आहे.
//

const developmentDashboardData: DashboardData = {
  citizens: 1245,
  projects: 52,
  requests: 218,
  officers: 86,
};

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

// ================================
// DASHBOARD SERVICE
// ================================

export const getDashboardData =
  async (): Promise<DashboardData> => {
    // API call simulate करण्यासाठी छोटा delay
    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    return developmentDashboardData;
  };

// ================================
// REQUESTS SERVICE
// ================================

export const getRequests =
  async (): Promise<RequestData[]> => {
    // API call simulate करण्यासाठी छोटा delay
    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    return developmentRequests;
  };