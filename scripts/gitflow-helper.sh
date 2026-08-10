#!/bin/bash

# Git Flow Helper Script
# Provides quick commands for common Git Flow operations

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

show_help() {
    print_header "Git Flow Helper"
    echo ""
    echo "Usage: ./scripts/gitflow-helper.sh [command] [options]"
    echo ""
    echo "FEATURES:"
    echo "  feature start <name>       Start a new feature branch"
    echo "  feature finish <name>      Finish and merge feature branch"
    echo ""
    echo "BUGFIXES:"
    echo "  bugfix start <name>        Start a new bugfix branch"
    echo "  bugfix finish <name>       Finish and merge bugfix branch"
    echo ""
    echo "RELEASES:"
    echo "  release start <version>    Start a new release (e.g., 1.2.0)"
    echo "  release finish <version>   Finish and tag release"
    echo ""
    echo "HOTFIXES:"
    echo "  hotfix start <name>        Start a hotfix branch"
    echo "  hotfix finish <name>       Finish and tag hotfix"
    echo ""
    echo "UTILITY:"
    echo "  status                     Show current branch status"
    echo "  branches                   List all branches"
    echo "  tags                       List all release tags"
    echo "  clean                      Clean up stale local branches"
    echo "  sync                       Sync develop and main from origin"
    echo ""
}

# Feature commands
feature_start() {
    local name=$1
    if [ -z "$name" ]; then
        print_error "Feature name required"
        exit 1
    fi
    print_header "Starting Feature: $name"
    git flow feature start "$name"
    print_success "Feature branch created: feature/$name"
}

feature_finish() {
    local name=$1
    if [ -z "$name" ]; then
        print_error "Feature name required"
        exit 1
    fi
    print_header "Finishing Feature: $name"
    git flow feature finish "$name"
    print_success "Feature merged to develop"
}

# Bugfix commands
bugfix_start() {
    local name=$1
    if [ -z "$name" ]; then
        print_error "Bugfix name required"
        exit 1
    fi
    print_header "Starting Bugfix: $name"
    git flow bugfix start "$name"
    print_success "Bugfix branch created: bugfix/$name"
}

bugfix_finish() {
    local name=$1
    if [ -z "$name" ]; then
        print_error "Bugfix name required"
        exit 1
    fi
    print_header "Finishing Bugfix: $name"
    git flow bugfix finish "$name"
    print_success "Bugfix merged to develop"
}

# Release commands
release_start() {
    local version=$1
    if [ -z "$version" ]; then
        print_error "Version required (e.g., 1.2.0)"
        exit 1
    fi
    print_header "Starting Release: $version"
    
    # Update version in package.json
    print_warning "Update version in package.json to $version"
    npm version "$version" --no-git-tag-version || true
    
    git flow release start "$version"
    print_success "Release branch created: release/$version"
    echo ""
    echo "Next steps:"
    echo "1. Update CHANGELOG.md"
    echo "2. Test the release"
    echo "3. Run: ./scripts/gitflow-helper.sh release finish $version"
}

release_finish() {
    local version=$1
    if [ -z "$version" ]; then
        print_error "Version required (e.g., 1.2.0)"
        exit 1
    fi
    print_header "Finishing Release: $version"
    
    # Run tests before release
    echo "Running tests..."
    npm run lint || { print_error "Lint failed"; exit 1; }
    npm run build || { print_error "Build failed"; exit 1; }
    
    git flow release finish "$version"
    git tag -a "v$version" -m "Release v$version"
    print_success "Release completed and tagged: v$version"
    echo ""
    echo "Next steps:"
    echo "1. Push to remote: git push origin main develop --tags"
}

# Hotfix commands
hotfix_start() {
    local name=$1
    if [ -z "$name" ]; then
        print_error "Hotfix name required"
        exit 1
    fi
    print_header "Starting Hotfix: $name"
    print_warning "Hotfixes are for critical production issues only!"
    git flow hotfix start "$name"
    print_success "Hotfix branch created: hotfix/$name"
}

hotfix_finish() {
    local name=$1
    if [ -z "$name" ]; then
        print_error "Hotfix name required"
        exit 1
    fi
    print_header "Finishing Hotfix: $name"
    git flow hotfix finish "$name"
    print_success "Hotfix merged to main and develop"
    echo ""
    echo "Next steps:"
    echo "1. Push to remote: git push origin main develop --tags"
}

# Utility commands
show_status() {
    print_header "Git Status"
    echo ""
    echo "Current branch: $(git branch --show-current)"
    echo ""
    git status
}

list_branches() {
    print_header "All Branches"
    echo ""
    git branch -a
}

list_tags() {
    print_header "Release Tags"
    echo ""
    git tag -l 'v*' --sort=-version:refname
}

clean_branches() {
    print_header "Cleaning Local Branches"
    print_warning "This will delete merged local branches"
    echo ""
    
    # Delete local branches that are fully merged
    git branch --merged | grep -v 'main\|develop' | xargs -r git branch -d
    
    # Prune remote-tracking branches
    git remote prune origin
    
    print_success "Cleanup complete"
}

sync_branches() {
    print_header "Syncing Branches"
    
    # Fetch latest from remote
    git fetch origin
    
    # Update main
    echo "Updating main..."
    git checkout main
    git pull origin main
    
    # Update develop
    echo "Updating develop..."
    git checkout develop
    git pull origin develop
    
    print_success "Branches synced"
}

# Main script logic
case "$1" in
    feature)
        case "$2" in
            start) feature_start "$3" ;;
            finish) feature_finish "$3" ;;
            *) print_error "Use: feature start|finish <name>"; exit 1 ;;
        esac
        ;;
    bugfix)
        case "$2" in
            start) bugfix_start "$3" ;;
            finish) bugfix_finish "$3" ;;
            *) print_error "Use: bugfix start|finish <name>"; exit 1 ;;
        esac
        ;;
    release)
        case "$2" in
            start) release_start "$3" ;;
            finish) release_finish "$3" ;;
            *) print_error "Use: release start|finish <version>"; exit 1 ;;
        esac
        ;;
    hotfix)
        case "$2" in
            start) hotfix_start "$3" ;;
            finish) hotfix_finish "$3" ;;
            *) print_error "Use: hotfix start|finish <name>"; exit 1 ;;
        esac
        ;;
    status) show_status ;;
    branches) list_branches ;;
    tags) list_tags ;;
    clean) clean_branches ;;
    sync) sync_branches ;;
    help|--help|-h) show_help ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
