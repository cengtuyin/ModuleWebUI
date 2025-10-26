class Shell {
    static async Run(cmd, options = {}) {
        return new Promise((resolve, reject) => {
            const callbackFuncName = `exec_callback_${Date.now()}`;
            
            window[callbackFuncName] = (errno, stdout, stderr) => {
                delete window[callbackFuncName];
                
                if (errno !== 0) {
                    const result = {
                        success: false,
                        error: `Command failed with exit code ${errno}`,
                        stderr: stderr,
                        code: errno
                    };
                    reject(result);
                    return;
                }
                
                const result = {
                    success: true,
                    stdout: stdout,
                    stderr: stderr
                };
                resolve(result);
            };
            
            try {
                ksu.exec(cmd, "{}", callbackFuncName);
            } catch (error) {
                delete window[callbackFuncName];
                const result = {
                    success: false,
                    error: error.message,
                    stderr: error.toString(),
                    code: -1
                };
                reject(result);
            }
        });
    }

    static async ExecuteOutput(command, options = {}) {
        const result = await this.Run(command, options);
        if (result.success) {
            return result.stdout;
        } else {
            throw new Error(result.error);
        }
    }
}

