import { toast } from 'react-toastify';

class UserService {
  constructor() {
    this.initializeApperClient();
  }

  // Initialize ApperClient
  initializeApperClient() {
    try {
      if (typeof window !== 'undefined' && window.ApperSDK) {
        const { ApperClient } = window.ApperSDK;
        this.apperClient = new ApperClient({
          apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
          apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
        });
      }
    } catch (error) {
      console.warn('ApperClient initialization failed:', error);
    }
  }

  // Get all users
  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "firstName" } },
          { field: { Name: "lastName" } },
          { field: { Name: "email" } },
          { field: { Name: "telephone" } },
          { field: { Name: "createdAt" } }
        ],
        orderBy: [
          {
            fieldName: "createdAt",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 100,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords('app_User', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching users:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }

  // Get user by ID
  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "firstName" } },
          { field: { Name: "lastName" } },
          { field: { Name: "email" } },
          { field: { Name: "telephone" } },
          { field: { Name: "createdAt" } }
        ]
      };

      const response = await this.apperClient.getRecordById('app_User', id, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching user with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Create user (sign up)
  async signUp(userData) {
    try {
      const params = {
        records: [
          {
            Name: `${userData.firstName} ${userData.lastName}`,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            telephone: userData.telephone,
            password: userData.password,
            createdAt: new Date().toISOString()
          }
        ]
      };

      const response = await this.apperClient.createRecord('app_User', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);

        if (failedRecords.length > 0) {
          console.error(`Failed to create user ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
          
          throw new Error('Failed to create user account');
        }

        if (successfulRecords.length > 0) {
          const newUser = successfulRecords[0].data;
          // Remove password from response
          const { password: _, ...userWithoutPassword } = newUser;
          return userWithoutPassword;
        }
      }

      throw new Error('Failed to create user account');
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating user:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  }

  // Sign in user
  async signIn(email, password) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "firstName" } },
          { field: { Name: "lastName" } },
          { field: { Name: "email" } },
          { field: { Name: "telephone" } },
          { field: { Name: "password" } },
          { field: { Name: "createdAt" } }
        ],
        where: [
          {
            FieldName: "email",
            Operator: "EqualTo",
            Values: [email.toLowerCase()]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords('app_User', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      const users = response.data || [];
      
      if (users.length === 0) {
        throw new Error('User not found with this email address');
      }

      const user = users[0];
      
      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error signing in user:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error(error.message);
        throw error;
      }
    }
  }

  // Update user
  async update(id, userData) {
    try {
      const params = {
        records: [
          {
            Id: id,
            ...userData
          }
        ]
      };

      const response = await this.apperClient.updateRecord('app_User', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);

        if (failedUpdates.length > 0) {
          console.error(`Failed to update user ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        if (successfulUpdates.length > 0) {
          const updatedUser = successfulUpdates[0].data;
          // Remove password from response
          const { password: _, ...userWithoutPassword } = updatedUser;
          return userWithoutPassword;
        }
      }

      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating user:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }

  // Delete user
  async delete(id) {
    try {
      const params = {
        RecordIds: [id]
      };

      const response = await this.apperClient.deleteRecord('app_User', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete user ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successfulDeletions.length > 0;
      }

      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting user:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
}

export const userService = new UserService();