cmake_minimum_required(VERSION 3.22.1)

project(UserAuthApp)

# Set C++ standard to C++20 for concepts support
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add flags for proper C++20 support
add_compile_options(
    -std=c++20
    -fexceptions
    -frtti
)
