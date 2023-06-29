# Magnet Command Line

The Magnet command-line interface (Magnet CLI) is a set of commands used to access Magnet Network resources

## Quick Start

## Usage

### 1. Login

> Secret seeds will be stored locally and won't be leaked by cli-itself.

**Login** with Magnet Account secret **seeds**(*12/24 random words*), it will be used to sign your publishing transaction.

```shell
npx magnet-cli login "vanish desert itch writer pretty unite wax wistful painful pine key bore"
```

### 2. Prompt

```shell
npx magnet-cli prompt 'Hello, what's your name'
```

### 3. Status

Status will help you to monitor your prompt on-chain

```shell
npx magnet-cli status <nonce>
```
