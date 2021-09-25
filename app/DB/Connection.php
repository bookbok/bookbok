<?php

namespace App\DB;

use Illuminate\Database\Connection as BaseConnection;
use Illuminate\Support\Facades\DB;
use LogicException;
use RuntimeException;

class Connection
{
    public const SELECT_LOCKING_MODE_NONE = 'none';
    /** 排他ロック（FOR UPDATE）をかけてSELECTをする */
    public const SELECT_LOCKING_MODE_EXCLUSIVE = 'exclusive';
    /** 共有ロック（LOCK IN SHARE MODE）をかけてSELECTをする */
    public const SELECT_LOCKING_MODE_SHARE = 'share';

    /**
     * Laravel の Connection は、Master/Slave 構成になってもレプリケーション遅延とかをいい感じに考えて切り替えてくれる。
     */
    private BaseConnection $connection;

    /** @phpstan-var non-negative-int 有効なトランザクションの数。ネスト可能なので */
    private int $transactions = 0;

    public function __construct(string $connectionName = null)
    {
        $this->connection = DB::connection($connectionName);
    }

    /**
     * @param int $attempts トランザクション内処理の最大試行回数。
     * @phpstan-template T
     * @phpstan-param callable(Connection): T $callback
     * @phpstan-return T
     */
    public function transaction(callable $callback, int $attempts = 1): mixed
    {
        $this->transactions++;
        $result = $this->connection->transaction(fn() => $callback($this), $attempts);
        $this->transactions = max(0, $this->transactions - 1); //@phpstan-ignore-line maxはintを返す
        return $result;
    }

    /**
     * @phpstan-param Connection::SELECT_LOCKING_MODE_* $mode
     * @phpstan-return array<string,mixed>[]
     */
    public function select(
        string $query,
        array $bindings = [],
        string $mode = self::SELECT_LOCKING_MODE_NONE,
        bool $forceUseWritePdo = false
    ): array {
        assert(str_starts_with(trim($query), 'SELECT'));

        [$query, $bindings] = SQL::transform($query, $bindings);

        if ($mode === self::SELECT_LOCKING_MODE_EXCLUSIVE) {
            // master/slave 構成じゃないので封印
            // assert($forceUseWritePdo === true, '排他ロックモードでSELECTするならmasterへクエリを打つ必要がある');
            $query .= ' FOR UPDATE';
        } elseif ($mode === self::SELECT_LOCKING_MODE_SHARE) {
            $query .= ' LOCK IN SHARE MODE';
        }

        if ($mode !== self::SELECT_LOCKING_MODE_NONE && $this->transactions === 0) {
            // 事故防止のため
            throw new LogicException('ロックして SELECT するのはトランザクション内でないといけない');
        }

        return $this->connection->select($query, $bindings, !$forceUseWritePdo);
    }

    public function insert(string $query, array $bindings = []): void
    {
        assert(str_starts_with(trim($query), 'INSERT'));

        $result = $this->connection->insert(...SQL::transform($query, $bindings));

        if (!$result) {
            throw new RuntimeException('INSERTの実行に失敗した');
        }
    }

    /**
     * INSERT して、挿入したレコードのIDを返す。
     *
     * MEMO: このメソッドでIDを取得するのはオートインクリメントなテーブルへの挿入ぐらいなはず。
     * なので int のみ返すようにしている。
     *
     * @phpstan-return positive-int
     */
    public function insertWillReturnLastInsertId(string $query, array $bindings = []): int
    {
        $this->insert($query, $bindings);
        /** @var string|false */
        $lastInsertId = $this->connection->getPdo()->lastInsertId();

        if ($lastInsertId === false) {
            throw new RuntimeException('INSERTしたレコードのIDを取得できなかった');
        }

        // @phpstan-ignore-next-line ここまで来ているからには positive-int なはず
        return (int)$lastInsertId;
    }

    /**
     * @return int 影響のあったレコードの数
     * @phpstan-return non-negative-int
     */
    public function update(string $query, array $bindings = []): int
    {
        assert(str_starts_with(trim($query), 'UPDATE'));

        // @phpstan-ignore-next-line 影響レコード数は0以上の数値
        return $this->connection->update(...SQL::transform($query, $bindings));
    }

    /**
     * @return int 影響のあったレコードの数
     * @phpstan-return non-negative-int
     */
    public function delete(string $query, array $bindings = []): int
    {
        assert(str_starts_with(trim($query), 'DELETE'));

        // @phpstan-ignore-next-line 影響レコード数は0以上の数値
        return $this->connection->delete(...SQL::transform($query, $bindings));
    }
}
