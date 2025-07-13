#!/usr/bin/env python3
"""
GitHub Push Script for RIVAL Project
This script handles proper git operations for pushing the RIVAL website to GitHub
"""

import os
import subprocess
import sys
from pathlib import Path

def run_command(cmd, cwd=None):
    """Run a command and return the result"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        return False, "", str(e)

def create_gitignore():
    """Create a proper .gitignore file"""
    gitignore_content = """# Dependencies
node_modules/
yarn.lock
package-lock.json

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# Virtual environments
venv/
env/
ENV/
.venv/
.env/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/
/var/log/

# Build outputs
frontend/build/
backend/build/
dist/

# Environment variables (keep structure but not actual values)
# .env files are included in repo with placeholder values

# Temporary files
*.tmp
*.temp
.cache/

# Supervisor logs
*.out.log
*.err.log
"""
    
    try:
        with open('/app/.gitignore', 'w') as f:
            f.write(gitignore_content)
        print("✅ Created .gitignore file")
        return True
    except Exception as e:
        print(f"❌ Error creating .gitignore: {e}")
        return False

def check_git_status():
    """Check current git status"""
    print("\n🔍 Checking git status...")
    success, stdout, stderr = run_command("git status --porcelain", cwd="/app")
    
    if success:
        if stdout.strip():
            print("📋 Files to be committed:")
            for line in stdout.strip().split('\n'):
                if line.strip():
                    print(f"  {line}")
        else:
            print("✅ Working directory clean")
        return True
    else:
        print(f"❌ Git status error: {stderr}")
        return False

def add_files_to_git():
    """Add appropriate files to git"""
    print("\n📁 Adding files to git...")
    
    # Add all files respecting .gitignore
    success, stdout, stderr = run_command("git add .", cwd="/app")
    
    if success:
        print("✅ Files added to git")
        return True
    else:
        print(f"❌ Error adding files: {stderr}")
        return False

def commit_changes():
    """Commit changes with a meaningful message"""
    print("\n💾 Committing changes...")
    
    commit_message = "feat: Complete RIVAL Xbox stealth website implementation\n\n- Full-stack React + FastAPI architecture\n- Dark theme with #2A52BE primary color\n- Hero section with RIVAL branding\n- Features section with 6 stealth features\n- Pricing tiers from Trial ($1.99) to Lifetime ($19.99)\n- Discord integration section\n- About section with creator info\n- Professional footer with attribution\n- Responsive design with smooth animations\n- MongoDB integration for future features\n- API endpoints for features, pricing, and status"
    
    success, stdout, stderr = run_command(f'git commit -m "{commit_message}"', cwd="/app")
    
    if success:
        print("✅ Changes committed successfully")
        return True
    elif "nothing to commit" in stderr:
        print("ℹ️  No changes to commit")
        return True
    else:
        print(f"❌ Error committing: {stderr}")
        return False

def check_remote_origin():
    """Check if remote origin is set"""
    print("\n🔗 Checking remote origin...")
    
    success, stdout, stderr = run_command("git remote -v", cwd="/app")
    
    if success:
        if stdout.strip():
            print("📡 Remote origins:")
            for line in stdout.strip().split('\n'):
                print(f"  {line}")
            return True
        else:
            print("⚠️  No remote origin set")
            return False
    else:
        print(f"❌ Error checking remote: {stderr}")
        return False

def push_to_github():
    """Attempt to push to GitHub"""
    print("\n🚀 Pushing to GitHub...")
    
    success, stdout, stderr = run_command("git push origin main", cwd="/app")
    
    if success:
        print("✅ Successfully pushed to GitHub!")
        return True
    else:
        print(f"❌ Push failed: {stderr}")
        
        # Check for common issues
        if "403" in stderr or "Permission denied" in stderr:
            print("\n🔐 Authentication Issue Detected!")
            print("This means GitHub is rejecting your push due to authentication.")
            print("\nPossible solutions:")
            print("1. Set up a Personal Access Token (PAT)")
            print("2. Use SSH keys instead of HTTPS")
            print("3. Check if the repository exists and you have write access")
            print("\nFor now, use the Emergent platform's 'Save to GitHub' feature")
            print("which handles authentication automatically.")
        
        return False

def main():
    """Main function to orchestrate the GitHub push process"""
    print("🎮 RIVAL GitHub Push Script")
    print("=" * 40)
    
    # Change to the project directory
    os.chdir('/app')
    
    # Step 1: Create .gitignore
    if not create_gitignore():
        sys.exit(1)
    
    # Step 2: Check git status
    if not check_git_status():
        sys.exit(1)
    
    # Step 3: Add files to git
    if not add_files_to_git():
        sys.exit(1)
    
    # Step 4: Commit changes
    if not commit_changes():
        sys.exit(1)
    
    # Step 5: Check remote origin
    if not check_remote_origin():
        print("\n⚠️  You need to set up a remote origin first:")
        print("git remote add origin https://github.com/username/repository.git")
        print("Or use the Emergent platform's GitHub integration")
        sys.exit(1)
    
    # Step 6: Push to GitHub
    if not push_to_github():
        print("\n💡 Alternative: Use Emergent's 'Save to GitHub' feature")
        print("This handles authentication automatically and is the recommended method.")
        sys.exit(1)
    
    print("\n🎉 All done! Your RIVAL website is now on GitHub!")

if __name__ == "__main__":
    main()